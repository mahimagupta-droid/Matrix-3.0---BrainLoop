export const questions = [
    {
        id: 1,
        "question": "What is the time complexity of binary search on a sorted array?",
        "options": ["a) O(n)", "b) O(log n)", "c) O(n log n)", "d) O(1)"],
        "correctAnswer": "b) O(log n)",
        "topic": "Binary Search",
        "difficulty": "easy",
        "diagnosticValue": "Tests understanding of logarithmic complexity; O(n) suggests linear search confusion, O(1) indicates misunderstanding of input dependency"
    },
    {
        id: 2,
        "question": "Which of the following is a prerequisite for binary search to work correctly?",
        "options": ["a) Array must be sorted", "b) Array must be in descending order", "c) Array size must be a power of 2", "d) Array elements must be distinct"],
        "correctAnswer": "a) Array must be sorted",
        "topic": "Binary Search",
        "difficulty": "easy",
        "diagnosticValue": "Tests basic understanding; choosing 'power of 2' or 'distinct' shows gaps in fundamental concepts"
    },
    {
        id: 3,
        "question": "What is the maximum number of comparisons needed to search in an array of size 1,000,000 using binary search?",
        "options": ["a) 1,000,000", "b) 20", "c) 30", "d) 50"],
        "correctAnswer": "b) 20",
        "topic": "Binary Search",
        "difficulty": "medium",
        "diagnosticValue": "Tests ability to calculate log2(1,000,000); wrong answers reveal inability to apply logarithmic calculations"
    },
    {
        id: 4,
        "question": "In the worst case, how many times will the middle element be accessed when searching in a sorted array of size n using binary search?",
        "options": ["a) 1", "b) log n", "c) n/2", "d) n"],
        "correctAnswer": "b) log n",
        "topic": "Binary Search",
        "difficulty": "medium",
        "diagnosticValue": "Tests understanding of recursive calls; 'n/2' shows confusion about iteration patterns"
    },
    {
        id: 5,
        "question": "Which of the following array operations has O(1) time complexity?",
        "options": ["a) Inserting element at beginning", "b) Deleting element from end", "c) Searching for an element", "d) Sorting the array"],
        "correctAnswer": "b) Deleting element from end",
        "topic": "Arrays",
        "difficulty": "easy",
        "diagnosticValue": "Tests knowledge of array operation complexities; 'searching' suggests conflating with hash tables"
    },
    {
        id: 6,
        "question": "What is the time complexity of inserting an element at a specific position in the middle of an unsorted array of size n?",
        "options": ["a) O(1)", "b) O(log n)", "c) O(n)", "d) O(n log n)"],
        "correctAnswer": "c) O(n)",
        "topic": "Arrays",
        "difficulty": "medium",
        "diagnosticValue": "Tests understanding of shift operations; O(1) shows ignoring shift cost, O(log n) suggests binary search confusion"
    },
    {
        id: 7,
        "question": "When reversing an array in-place, what space complexity is required?",
        "options": ["a) O(1)", "b) O(n)", "c) O(log n)", "d) O(n²)"],
        "correctAnswer": "a) O(1)",
        "topic": "Arrays",
        "difficulty": "easy",
        "diagnosticValue": "Tests understanding of in-place operations; O(n) suggests missing 'in-place' requirement understanding"
    },
    {
        id: 8,
        "question": "Consider an array: [3, 1, 4, 1, 5, 9, 2, 6]. How many elements are incorrect if we perform binary search for element 4 without sorting?",
        "options": ["a) Binary search will work fine and find 4", "b) Binary search will fail and may return incorrect results", "c) Binary search will find 4 but take O(n) time", "d) We need to use linear search instead"],
        "correctAnswer": "b) Binary search will fail and may return incorrect results",
        "topic": "Binary Search",
        "difficulty": "hard",
        "diagnosticValue": "Tests understanding of prerequisites; choosing first option shows critical conceptual gap"
    },
    {
        id: 9,
        "question": "What is the time complexity of finding all occurrences of a character in a string of length n?",
        "options": ["a) O(1)", "b) O(log n)", "c) O(n)", "d) O(n²)"],
        "correctAnswer": "c) O(n)",
        "topic": "Strings",
        "difficulty": "easy",
        "diagnosticValue": "Tests string traversal understanding; O(log n) suggests inappropriate binary search thinking"
    },
    {
        id: 10,
        "question": "For the string 'abcabc', what is the time complexity of checking if it's a palindrome?",
        "options": ["a) O(1)", "b) O(n/2) = O(n)", "c) O(n log n)", "d) O(2^n)"],
        "correctAnswer": "b) O(n/2) = O(n)",
        "topic": "Strings",
        "difficulty": "medium",
        "diagnosticValue": "Tests understanding of Big O notation and string comparison; choosing others shows missing complexity analysis skill"
    },
    {
        id: 11,
        "question": "What is the space complexity of finding all anagrams of a string in a list of strings?",
        "options": ["a) O(1)", "b) O(n)", "c) O(n log n)", "d) O(n × m) where n is list size and m is string length"],
        "correctAnswer": "d) O(n × m) where n is list size and m is string length",
        "topic": "Strings",
        "difficulty": "hard",
        "diagnosticValue": "Tests multi-variable complexity analysis; simpler answers show inability to analyze nested operations"
    },
    {
        id: 12,
        "question": "Binary search on a 2D sorted matrix is possible when: ",
        "options": ["a) Both rows and columns are sorted", "b) Only rows are sorted", "c) The matrix is sorted row-wise AND column-wise in a special way", "d) Any 2D matrix works with binary search"],
        "correctAnswer": "c) The matrix is sorted row-wise AND column-wise in a special way",
        "topic": "Binary Search",
        "difficulty": "hard",
        "diagnosticValue": "Tests understanding of binary search limitations; other answers show oversimplification"
    },
    {
        id: 13,
        "question": "What happens if you implement binary search on an array that is sorted in descending order?",
        "options": ["a) It works perfectly fine", "b) It may return incorrect results", "c) Time complexity becomes O(n)", "d) You must reverse the comparison operators"],
        "correctAnswer": "d) You must reverse the comparison operators",
        "topic": "Binary Search",
        "difficulty": "medium",
        "diagnosticValue": "Tests understanding of algorithm adaptation; first option shows missing implementation detail knowledge"
    },
    {
        id: 14,
        "question": "Given a rotated sorted array like [4,5,6,7,0,1,2], what is the minimum time complexity to find an element?",
        "options": ["a) O(n)", "b) O(log n)", "c) O(n/2)", "d) O(√n)"],
        "correctAnswer": "b) O(log n)",
        "topic": "Binary Search",
        "difficulty": "hard",
        "diagnosticValue": "Tests advanced binary search understanding; O(n) shows giving up on optimization"
    },
    {
        id: 15,
        "question": "What is the time complexity of removing all duplicates from an unsorted array of n elements while maintaining order?",
        "options": ["a) O(n)", "b) O(n log n)", "c) O(n²)", "d) O(2^n)"],
        "correctAnswer": "c) O(n²)",
        "topic": "Arrays",
        "difficulty": "hard",
        "diagnosticValue": "Tests understanding of nested operations; O(n) or O(n log n) suggests missing complexity of maintaining order"
    },
    {
        id: 16,
        "question": "For string pattern matching, which of these has the BEST average-case time complexity?",
        "options": ["a) Naive approach: O(n×m)", "b) KMP algorithm: O(n+m)", "c) Rabin-Karp with good hash: O(n+m)", "d) All have the same complexity"],
        "correctAnswer": "b) KMP algorithm: O(n+m)",
        "topic": "Strings",
        "difficulty": "hard",
        "diagnosticValue": "Tests knowledge of algorithm optimizations; choosing naive approach shows missing pattern matching knowledge"
    },
    {
        id: 17,
        "question": "In a sorted array [1, 3, 5, 7, 9], using binary search to find element 6, where will the search terminate?",
        "options": ["a) At index 1", "b) At index 2", "c) At index 3", "d) After checking indices where 5 < target < 7"],
        "correctAnswer": "d) After checking indices where 5 < target < 7",
        "topic": "Binary Search",
        "difficulty": "medium",
        "diagnosticValue": "Tests understanding of element not found scenarios; specific indices suggest missing logic of search termination"
    },
    {
        id: 18,
        "question": "What is the key insight that makes binary search achieve O(log n) instead of O(n)?",
        "options": ["a) Dividing the search space in half with each comparison", "b) Using a hash table", "c) Sorting the array", "d) Using recursion"],
        "correctAnswer": "a) Dividing the search space in half with each comparison",
        "topic": "Binary Search",
        "difficulty": "easy",
        "diagnosticValue": "Tests understanding of divide-and-conquer principle; other answers show missing core concept"
    }
]