const userName = localStorage.UserName ;
const userEmail = localStorage.UserEmail ;
let answers = localStorage.answers;
const questionsData = getQuestionsData();

const gradeField= document.getElementById('grade');
const userNameField = document.getElementById('userName');
const userEmailField = document.getElementById('userEmail');
let grade = 0;
// TRIM ANSWERS
answers = answers.split('-');
answers.pop();


// EVALUATE ANSWERS
for (let ques of questionsData)
{
    for(ans of answers)
    {
        if(Number(ans.split('=')[0]) === ques.id )
        {
            if(ques.getRightAnswer().text  === ans.split('=')[1])
            {
                grade++;
            }
        }
    }
}

// UI
userNameField.textContent = userName;
gradeField.textContent = `${(grade/questionsData.length)*100}%`;
userEmailField.textContent = userEmail;