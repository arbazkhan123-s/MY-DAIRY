
shownotes();
imp();

let addbtn = document.getElementById('addbtn');
let tone = document.getElementById('tone');
addbtn.addEventListener('click', function (e) {
    let addtxt = document.getElementById('addtxt');
    let addtitle = document.getElementById('title');

    if (addtxt.value == "" || addtitle.value == "") {
        alert("Kindly provide the input");
    }
    else {
        tone.play();
        let notes = localStorage.getItem('notes')
        if (notes == null) {
            notesobj = [];
        }
        else {
            notesobj = JSON.parse(notes)
        }
        let myobj = {
            notes: addtxt.value,
            title: addtitle.value
        }
        notesobj.push(myobj)
        localStorage.setItem('notes', JSON.stringify(notesobj));
        addtxt.value = "";
        addtitle.value = "";
        shownotes();
    }
})
function shownotes(element, index) {
    let notes = localStorage.getItem('notes')

    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
        <div class="note-card col-lg-4 my-3">
            <div class="card crd-2">
                <div class="card-body">
                  <div class="apnd">
                    <h5 class="card-title tbl"> ${element.title}</h5>
                  </div>
                    <p class="card-text">${element.notes}</p>
                    <button class="btn btn-primary btn-2" id="${index}" onclick="dlt(this.id)" >delete note</button>
                    <button class="btn btn-primary btn-2" id="${element.notes}" onclick="imp(this.id)" >Add Important</button>
                </div>
            </div>
        </div>
        `

    });



    let notelem = document.getElementById('notes')
    if (notesobj.length != 0) {
        notelem.innerHTML = html;
    }
    else {
        notelem.innerHTML = `There is nothing to show... Kindly Add your notes !`
    };

}
let remove = document.getElementById('remove')
let music = document.getElementById('music')
remove.addEventListener('click', function () {
    music.play();
    alert('are you sure, want to reset notes ?')
    localStorage.clear();
    window.location.reload();
})

function dlt(index) {
    music.play();
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes)
    }
    notesobj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    shownotes();
}

let serch = document.getElementById('searchbtn');
serch.addEventListener('input', function () {
    let cardtxt = document.getElementsByClassName('note-card');
    let inputval = serch.value
    console.log();
    Array.from(cardtxt).forEach(function (element) {
        let cardval = element.getElementsByTagName('h5')[0].innerText
        if (cardval.includes(inputval)) {
            element.style.display = "block";

        }
        else {
            element.style.display = "none";
        }
    })
})


function imp(element) {
    let cardtxt = document.getElementsByClassName('note-card');
    Array.from(cardtxt).forEach(function (e) {
        let cardval = e.getElementsByTagName('p')[0].innerText
        if (cardval == element) {
            e.style.background ='red';
        }

    })
}