import mongoose from 'mongoose';

const QuestionResultSchema = new mongoose.Schema({
  questionId: Number,
  question: String,
  selectedAnswer: String,
  correctAnswer: String,
  isCorrect: Boolean,
  topic: String,
  difficulty: String,
  diagnosticValue: String,
});

const QuizResultSchema = new mongoose.Schema({
  userId: String,
  topic: String,
  difficulty: String,
  totalQuestions: Number,
  correctAnswers: Number,
  score: Number, 
  questionResults: [QuestionResultSchema],
  weakTopics: [String],
  timestamp: { type: Date, default: Date.now },
  quizMetadata: {
    generatedAt: String,
    timeTaken: Number, 
  }
});

QuizResultSchema.index({ userId: 1, timestamp: -1 });
QuizResultSchema.index({ userId: 1, topic: 1 });

export default mongoose.models.QuizResult || 
  mongoose.model('QuizResult', QuizResultSchema);