const startbutton=document.querySelector('.start');
startbutton.addEventListener('click',function()
{
    var name = document.getElementById("nameInput").value;
    if(name=='')
    {
        alert("enter a name");
    }
    else
    {
    localStorage.setItem("userName", name);
    window.location.href = "sudoku.html";
    }
})