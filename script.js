
let draggedEl, onDragStart, onDrag, onDragEnd, grabPointY, grabPointX, addNoteButton, createNote, init, saveNote, deleteNote, loadNotes

onDragStart = function (e) {
    let boundClientRect
    if (e.target.className.indexOf('bar') === -1) {
        return
    }
    draggedEl = this
    boundClientRect = draggedEl.getBoundingClientRect()
    grabPointY = boundClientRect.top - e.clientY
    grabPointX = boundClientRect.left - e.clientX
}

onDrag = function (e) {
    if (!draggedEl) { return; }
    let posX = e.clientX + grabPointX
    let posY = e.clientY + grabPointY

    if (posX < 0) { posX = 0 }
    if (posY < 0) { posY = 0 }

    draggedEl.style.transform = "translateX(" + posX + "px) translateY(" + posY + "px"
}

onDragEnd = function () {
    draggedEl = null
    grabPointX = null
    grabPointY = null
}

getNoteObj = function(element){
    let textarea = element.querySelector('textarea')
    return {
        content: textarea.value,
        id: element.id,
        transformCSSValue: element.style.transform
    }
}

createNote = function (options) {
    let stickerEl = document.createElement('div')
    let barEl = document.createElement('div')
    let textareaEl = document.createElement('textarea')
    let noteOptions = options || {
        content: '',
        id: "id" + new Date().getTime(),
        transformCSSValue: "translateX(" + Math.random() * 400 + "px) translateY(" + Math.random() * 400 + "px)"
    }
    barEl.classList.add('bar')
    stickerEl.classList.add('sticker')
    console.log(options)
    let saveBtn = document.createElement('button')
    let deleteBtn = document.createElement('button')
    let onDelete = function(){
        let object = {}
        deleteNote(object)
    }
    let onSave = function(){
        //let object = {}
        saveNote(getNoteObj(stickerEl))
    }
    let transformCSSValue = noteOptions.transformCSSValue
    saveBtn.addEventListener('click', onSave)
    deleteBtn.addEventListener('click',onDelete)
    barEl.appendChild(saveBtn)
    barEl.appendChild(deleteBtn)
    saveBtn.classList.add('saveBtn')
    deleteBtn.classList.add('deleteBtn')
    stickerEl.appendChild(barEl)
    stickerEl.appendChild(textareaEl)
    stickerEl.addEventListener('mousedown', onDragStart, false)
    document.body.appendChild(stickerEl)
}

let onAddNote = function(){
    createNote()
}
init = function () {
    saveNote= function(note){
        localStorage.setItem(note.id, note)
    }
    deleteNote = function(note){

    }
    loadNotes = function(){

    }
    loadNotes()
    addNoteButton = document.querySelector('.addNoteButton')
    addNoteButton.addEventListener('click', onAddNote,false)
    document.addEventListener('mousemove', onDrag, false)
    document.addEventListener('mouseup', onDragEnd, false)
}
init()


//document.querySelector('.sticker').addEventListener('mousedown', onDragStart, false)
