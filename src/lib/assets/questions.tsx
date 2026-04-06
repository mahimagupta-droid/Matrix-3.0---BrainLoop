export const questions = [
    {
        "question": "What is the time complexity of binary search on a sorted array?",
        "options": ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        "correctAnswer": "O(log n)",
        "topic": "Binary Search",
        "difficulty": "easy",
        "diagnosticValue": "Tests understanding of logarithmic complexity; O(n) suggests linear search confusion, O(1) indicates misunderstanding of input dependency"
    },
    {
        "question": "Which of the following is a prerequisite for binary search to work correctly?",
        "options": ["Array must be sorted", "Array must be in descending order", "Array size must be a power of 2", "Array elements must be distinct"],
        "correctAnswer": "Array must be sorted",
        "topic": "Binary Search",
        "difficulty": "easy",
        "diagnosticValue": "Tests basic understanding; choosing 'power of 2' or 'distinct' shows gaps in fundamental concepts"
    },
    {
        "question": "What is the maximum number of comparisons needed to search in an array of size 1,000,000 using binary search?",
        "options": ["1,000,000", "20", "30", "50"],
        "correctAnswer": "20",
        "topic": "Binary Search",
        "difficulty": "medium",
        "diagnosticValue": "Tests ability to calculate log2(1,000,000); wrong answers reveal inability to apply logarithmic calculations"
    },
    {
        "question": "In the worst case, how many times will the middle element be accessed when searching in a sorted array of size n using binary search?",
        "options": ["1", "log n", "n/2", "n"],
        "correctAnswer": "log n",
        "topic": "Binary Search",
        "difficulty": "medium",
        "diagnosticValue": "Tests understanding of recursive calls; 'n/2' shows confusion about iteration patterns"
    },
    {
        "question": "Which of the following array operations has O(1) time complexity?",
        "options": ["Inserting element at beginning", "Deleting element from end", "Searching for an element", "Sorting the array"],
        "correctAnswer": "Deleting element from end",
        "topic": "Arrays",
        "difficulty": "easy",
        "diagnosticValue": "Tests knowledge of array operation complexities; 'searching' suggests conflating with hash tables"
    },
    {
        "question": "What is the time complexity of inserting an element at a specific position in the middle of an unsorted array of size n?",
        "options": ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        "correctAnswer": "O(n)",
        "topic": "Arrays",
        "difficulty": "medium",
        "diagnosticValue": "Tests understanding of shift operations; O(1) shows ignoring shift cost, O(log n) suggests binary search confusion"
    },
    {
        "question": "When reversing an array in-place, what space complexity is required?",
        "options": ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        "correctAnswer": "O(1)",
        "topic": "Arrays",
        "difficulty": "easy",
        "diagnosticValue": "Tests understanding of in-place operations; O(n) suggests missing 'in-place' requirement understanding"
    },
    {
        "question": "Consider an array: [3, 1, 4, 1, 5, 9, 2, 6]. How many elements are incorrect if we perform binary search for element 4 without sorting?",
        "options": ["Binary search will work fine and find 4", "Binary search will fail and may return incorrect results", "Binary search will find 4 but take O(n) time", "We need to use linear search instead"],
        "correctAnswer": "Binary search will fail and may return incorrect results",
        "topic": "Binary Search",
        "difficulty": "hard",
        "diagnosticValue": "Tests understanding of prerequisites; choosing first option shows critical conceptual gap"
    },
    {
        "question": "What is the time complexity of finding all occurrences of a character in a string of length n?",
        "options": ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        "correctAnswer": "O(n)",
        "topic": "Strings",
        "difficulty": "easy",
        "diagnosticValue": "Tests string traversal understanding; O(log n) suggests inappropriate binary search thinking"
    },
    {
        "question": "For the string 'abcabc', what is the time complexity of checking if it's a palindrome?",
        "options": ["O(1)", "O(n/2) = O(n)", "O(n log n)", "O(2^n)"],
        "correctAnswer": "O(n/2) = O(n)",
        "topic": "Strings",
        "difficulty": "medium",
        "diagnosticValue": "Tests understanding of Big O notation and string comparison; choosing others shows missing complexity analysis skill"
    },
    {
        "question": "What is the space complexity of finding all anagrams of a string in a list of strings?",
        "options": ["O(1)", "O(n)", "O(n log n)", "O(n × m) where n is list size and m is string length"],
        "correctAnswer": "O(n × m) where n is list size and m is string length",
        "topic": "Strings",
        "difficulty": "hard",
        "diagnosticValue": "Tests multi-variable complexity analysis; simpler answers show inability to analyze nested operations"
    },
    {
        "question": "Binary search on a 2D sorted matrix is possible when: ",
        "options": ["Both rows and columns are sorted", "Only rows are sorted", "The matrix is sorted row-wise AND column-wise in a special way", "Any 2D matrix works with binary search"],
        "correctAnswer": "The matrix is sorted row-wise AND column-wise in a special way",
        "topic": "Binary Search",
        "difficulty": "hard",
        "diagnosticValue": "Tests understanding of binary search limitations; other answers show oversimplification"
    },
    {
        "question": "What happens if you implement binary search on an array that is sorted in descending order?",
        "options": ["It works perfectly fine", "It may return incorrect results", "Time complexity becomes O(n)", "You must reverse the comparison operators"],
        "correctAnswer": "You must reverse the comparison operators",
        "topic": "Binary Search",
        "difficulty": "medium",
        "diagnosticValue": "Tests understanding of algorithm adaptation; first option shows missing implementation detail knowledge"
    },
    {
        "question": "Given a rotated sorted array like [4,5,6,7,0,1,2], what is the minimum time complexity to find an element?",
        "options": ["O(n)", "O(log n)", "O(n/2)", "O(√n)"],
        "correctAnswer": "O(log n)",
        "topic": "Binary Search",
        "difficulty": "hard",
        "diagnosticValue": "Tests advanced binary search understanding; O(n) shows giving up on optimization"
    },
    {
        "question": "What is the time complexity of removing all duplicates from an unsorted array of n elements while maintaining order?",
        "options": ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"],
        "correctAnswer": "O(n²)",
        "topic": "Arrays",
        "difficulty": "hard",
        "diagnosticValue": "Tests understanding of nested operations; O(n) or O(n log n) suggests missing complexity of maintaining order"
    },
    {
        "question": "For string pattern matching, which of these has the BEST average-case time complexity?",
        "options": ["Naive approach: O(n×m)", "KMP algorithm: O(n+m)", "Rabin-Karp with good hash: O(n+m)", "All have the same complexity"],
        "correctAnswer": "KMP algorithm: O(n+m)",
        "topic": "Strings",
        "difficulty": "hard",
        "diagnosticValue": "Tests knowledge of algorithm optimizations; choosing naive approach shows missing pattern matching knowledge"
    },
    {
        "question": "In a sorted array [1, 3, 5, 7, 9], using binary search to find element 6, where will the search terminate?",
        "options": ["At index 1", "At index 2", "At index 3", "After checking indices where 5 < target < 7"],
        "correctAnswer": "After checking indices where 5 < target < 7",
        "topic": "Binary Search",
        "difficulty": "medium",
        "diagnosticValue": "Tests understanding of element not found scenarios; specific indices suggest missing logic of search termination"
    },
    {
        "question": "What is the key insight that makes binary search achieve O(log n) instead of O(n)?",
        "options": ["Dividing the search space in half with each comparison", "Using a hash table", "Sorting the array", "Using recursion"],
        "correctAnswer": "Dividing the search space in half with each comparison",
        "topic": "Binary Search",
        "difficulty": "easy",
        "diagnosticValue": "Tests understanding of divide-and-conquer principle; other answers show missing core concept"
    }
]