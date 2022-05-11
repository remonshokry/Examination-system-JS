var currentQuestionIndex = -1;
var maxQuestionsIndex = 9;
var markedQuestionsArr = [];
var answersArr = [];

// PULLING USER'S DATA AND CLEAR LOCAL STORAGE
const userEmail = localStorage.EmailAddress;
const userPassword = localStorage.Password;
const userName = localStorage.UserName;

localStorage.clear();

// /////////////////////////////////////////////
// QUESTION ELEMENT
const questionText = document.getElementById('question');
// ANSWERS
const firstAnswer = document.getElementById('answer1')
const secondAnwser = document.getElementById('answer2')
const thirdAnwser = document.getElementById('answer3')
const fourthAnwser = document.getElementById('answer4')
//  ANSWERS ARR
const answersElementArr = [firstAnswer , secondAnwser , thirdAnwser , fourthAnwser ];
// PROGRESS BAR
const progressBar = document.getElementById('progressBar');
const updateProgressBar = (n)=>{progressBar.style.width = n+'%';}

// CONTROLS 
const sumbitAnswers  = document.getElementById('submitAnswers');
const markQuestionBtn = document.getElementById('markQuestion');
const unMarkQuestionBtn = document.getElementById('unmarkQuestion');
const controlsContainer = document.getElementById('controlsContainer');
const previousQuestionBtn = document.getElementById('previousQuestion');
const nextQuestionBtn = document.getElementById('nextQuestion');
const questionNumber = document.getElementById('questionNumber');
const updateQuestionNumber = (n)=>{questionNumber.textContent =n;}

// MARKED QUESTIONS
const markedQuestionsContainer = document.getElementById('markedQuestionsContainer');
const generateMarkedQuestion = (questionNumber)=>{
    let row = document.createElement('div');
    let col = document.createElement('div');
    let colClassList = ["col", "bg-dark-orange", "py-3", "marked-question", "text-center", "f-montserrat", "rounded-3" ];
    row.classList.add('row');
    row.classList.add('mb-2');
    row.id = (`mark-${questionNumber-1}`)
    for (let cl of colClassList )
    {
        col.classList.add(cl);
    }
    row.appendChild(col);
    col.setAttribute('id' , questionNumber);
    col.textContent = 'Marked Question ' + questionNumber;
    markedQuestionsContainer.appendChild(row);
}
const removeMarkedQuestion = (questionNumber)=>{
    markedQuestionsContainer.removeChild(document.getElementById(`mark-${questionNumber}`));
}


// GENERATE QUESTION 

const generateQuestionById = (id)=>{
    getQuestionsData().forEach(el=>{
        if (el.id === id)
        {
            updateQuestionNumber(currentQuestionIndex +1 );
            questionText.textContent = `${currentQuestionIndex +1 } - ${el.text}`;
            for(let ansIndex in el.answersArr)
            {
                answersElementArr[ansIndex].labels[0].textContent = `${el.answersArr[ansIndex].no} - ${el.answersArr[ansIndex].text}`
            }
        }
    })
}

// INIT
const examData = getRandomExamData();
const nextQuestionIncrement = ()=>{
    if (currentQuestionIndex < maxQuestionsIndex)
    {
        currentQuestionIndex++;
    }
    else 
    {
        currentQuestionIndex = 0;
    }
}
const previousQuestionDecremet = ()=>{
    if (currentQuestionIndex > 0)
    {
        currentQuestionIndex--;
    }
    else 
    {
        currentQuestionIndex = maxQuestionsIndex;
    }
}
const disableAndEnableButtons = ()=>{
    if (currentQuestionIndex === 0 )
    {
        previousQuestionBtn.disabled = true;
    }
    else if (currentQuestionIndex === maxQuestionsIndex )
    {
        nextQuestionBtn.disabled = true;
    }
    else
    {
        nextQuestionBtn.disabled = false;
        previousQuestionBtn.disabled = false;
        
    }
}

const next = ()=>{
    removeCheck();
    unMarkQuestionBtn.style.display = 'none';
    markQuestionBtn.style.display = 'block';
    nextQuestionIncrement();
    disableAndEnableButtons();
    generateQuestionById(examData[currentQuestionIndex].id);
    markedQuestionsArr.forEach(el=>{
        if (el.no === currentQuestionIndex)
        {
            unMarkQuestionBtn.style.display = 'block';
            markQuestionBtn.style.display = 'none';
        }
    })
    
}

const previous = ()=>{
    removeCheck();
    unMarkQuestionBtn.style.display = 'none';
    markQuestionBtn.style.display = 'block';
    previousQuestionDecremet();
    disableAndEnableButtons();
    generateQuestionById(examData[currentQuestionIndex].id);
    markedQuestionsArr.forEach(el=>{
        if (el.no === currentQuestionIndex)
        {
            unMarkQuestionBtn.style.display = 'block';
            markQuestionBtn.style.display = 'none';
        }
    })
}



// CHECK
const removeCheck = ()=>{
    [].forEach.call(answersElementArr , (el)=>{
        el.checked = false;
    })
}

const checkPreviousAnswer = ()=>{
    for (let ansObj of answersArr)
    {
        if (ansObj._id === examData[currentQuestionIndex].id )
        {
            for (let answerElement of answersElementArr )
            {
                if (answerElement.labels[0].textContent.split(' - ')[1] === ansObj.ans)
                {
                    answerElement.checked = true;
                }
            }
        }
    }
}

const getCheckedAnswer = ()=>{
    for (let ans of answersElementArr)
    {
        if (ans.checked)
        {
            return ans.labels[0].textContent.split(' - ')[1];
        }
    }
}
const pushAnswerInArray = ( currentAnswer , quesId )=>{
    var editFlag = false;
    for (let ansObj of answersArr)
    {
        if (ansObj._id === quesId )
        {
            ansObj.ans = currentAnswer; 
            editFlag = true;
        }
    }
    if(!editFlag)
    {
        answersArr.push({_id : quesId , ans : currentAnswer})
    }
}

const activateSubmitBtn = ()=>{
    if (answersArr.length === maxQuestionsIndex)
    {
        sumbitAnswers.disabled = false;
    }
}


// EVENTS
nextQuestionBtn.addEventListener('click' ,()=>{ 
    pushAnswerInArray(getCheckedAnswer() , examData[currentQuestionIndex].id);
        // for(let ques of markedQuestionsArr)
        // {
        //     if (ques.no === currentQuestionIndex)
        //     {
        //         removeMarkedQuestion(currentQuestionIndex);
        //         markedQuestionsArr.forEach((el , index) =>
        //         {
        //             if (el.no === currentQuestionIndex )
        //             {
        //                 markedQuestionsArr.splice(index , 1);
        //             }
        //         })
        //     }
        // }
    next(); 
    checkPreviousAnswer();
    activateSubmitBtn();
});
previousQuestionBtn.addEventListener('click' ,()=>{
    previous();
    checkPreviousAnswer();
});

sumbitAnswers.addEventListener('click' , ()=>{
    // if (answersArr.length === maxQuestionsIndex && markedQuestionsArr.length === 0)
    // {
        // ANSWER NO 10
        pushAnswerInArray(getCheckedAnswer() , examData[currentQuestionIndex].id);
        window.localStorage.setItem("UserName",userName);
        window.localStorage.setItem("UserEmail",userEmail);
        let answerQueryString = '';
        for (obj of answersArr)
        {
            answerQueryString +=`${obj._id}=${obj.ans}-`
        }
        window.localStorage.setItem("answers" , answerQueryString);
        window.location.replace('../evaluation/evaluation.html');
    // }
    // else{
    //     pushAnswerInArray(getCheckedAnswer() , examData[currentQuestionIndex].id);
    //     for(let ques of markedQuestionsArr)
    //     {
    //         if (ques.no === currentQuestionIndex)
    //         {
    //             removeMarkedQuestion(currentQuestionIndex);
    //             markedQuestionsArr.forEach((el , index) =>
    //             {
    //                 if (el.no === currentQuestionIndex )
    //                 {
    //                     markedQuestionsArr.splice(index , 1);
    //                 }
    //             })
    //         }
    //     }
        // next();
    // }
})

markQuestionBtn.addEventListener('click' ,()=>{
    unMarkQuestionBtn.style.display = 'block';
    markQuestionBtn.style.display = 'none';
    generateMarkedQuestion(currentQuestionIndex+1);
    markedQuestionsArr.push({ no: currentQuestionIndex, question: examData[currentQuestionIndex]});
    [].forEach.call( markedQuestionsContainer.children , (el,index)=>{
        el.addEventListener('click' , ()=>{
            pushAnswerInArray(getCheckedAnswer() , examData[currentQuestionIndex].id);
            currentQuestionIndex = Number(el.id.split('-')[1]);
            markedQuestionsArr.forEach((element) =>{
                if (element.no === currentQuestionIndex )
                {
                    generateQuestionById(element.question.id);
                    disableAndEnableButtons();
                    checkPreviousAnswer();
                }
            })
            unMarkQuestionBtn.style.display = 'block';
            markQuestionBtn.style.display = 'none';
        })
    })
})

unMarkQuestionBtn.addEventListener('click' , ()=>{
    unMarkQuestionBtn.style.display = 'none'
    markQuestionBtn.style.display = 'block';
    removeMarkedQuestion(currentQuestionIndex);
    markedQuestionsArr.forEach((el , index) =>
    {
        if (el.no === currentQuestionIndex )
        {
            markedQuestionsArr.splice(index , 1);
        }
    })
})


// ON LOAD
var timer = 0;
window.onload = ()=>{
    sumbitAnswers.disabled = true;
    next();
    TimerInit();
    setInterval(() => {
        timer +=1;
        updateProgressBar(timer);
    },600 );
}

const TimerInit = ()=>{
    setTimeout(()=>{
        window.localStorage.setItem("UserName",userName);
        let answerQueryString = '';
        for (obj of answersArr)
        {
            answerQueryString +=`${obj._id}=${obj.ans}-`
        }
        window.localStorage.setItem("answers" , answerQueryString);
        window.location.replace('../timeOut/timeOut.html');
    } , 60000)
}

