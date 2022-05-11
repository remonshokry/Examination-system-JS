// QUSTIONS AND ANSWERS
function Answer( _no,_text ){
    this.no = _no;
    this.text = _text;
}

function Question( _id,_text , _ans1 , _ans2 , _ans3 , _ans4 , _rightAnswerNo){
    this.id = _id;
    this.text = _text;
    this.answersArr = [new Answer('a' ,_ans1) , new Answer('b' ,_ans2) , new Answer('c' ,_ans3) , new Answer('d' ,_ans4)];
    var rightAnswer = this.answersArr[_rightAnswerNo-1];
    this.getRightAnswer = function(){ return rightAnswer; }
}


const getQuestionsData = ()=>[
    new Question(1, 'Some teachers ____________ much homework.' , 'give' , 'gives' , 'are give' , 'is give' , 3),
    new Question(2, 'Taylor and Adam __________ good friends.' , 'be' , 'is' , 'are' , 'does' , 3),
    new Question(3, '_______ your parents let you go to bed late?' , 'Are' , 'Does' , 'Do' , 'Is' , 3),
    new Question(4, 'How many books __________ you read in a year?' , 'are' , 'were' , 'did' , 'do' , 3),
    new Question(5, 'He is good at football but he _____ want to play now.' , "isn't" , "wasn't" , "doesn't" , "don't" , 3),
    new Question(6, 'He is talking for hours but I _______ understand anything.' , "don't" , "wasn't" , "isn't" , "am not" , 3),
    new Question(7, 'How often ______ you go to the cinema?' , "are" , "do" , "was" , "does" , 3),
    new Question(8, 'She ________ like playing tennis. So she _______ plays tennis.' , "doesn't / always" , "doesn't / never" , "isn't / never" , "isn't / hardly ever" , 3),
    new Question(9, 'One of my friend ________ reads newspaper.' , "doesn't" , "does" , "never" , "isn't" , 3),
    new Question(10, 'How many students ________ English?' , "knows" , "are knowing" , "does know" , "know" , 3),
]

const getRandomExamData = ()=> getQuestionsData().sort(()=> Math.random() - 0.5);
