let onDragStart, draggedEl, createNote, onDrag, onDragEnd, getNoteObj, grabPointX, onAddNote, grabPointY, main, clearNotes, clearNotesBtn, saveNote, deleteNote, loadNotes, addNoteButton

onDragStart = function (e) {
    let boundingClientRect
    if (e.target.className.indexOf('bar') === -1) {
        return
    }
    draggedEl = this
    boundingClientRect = draggedEl.getBoundingClientRect()
    grabPointY = boundingClientRect.top - e.clientY
    grabPointX = boundingClientRect.left - e.clientX
}

onDrag = function (e) {
    if (!draggedEl) { return }
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
        transformCSSValue: element.style.transform,
        textarea:{
            width: textarea.style.width, height: textarea.style.height,
        }
    }
}
onAddNote = function(){
    createNote()
}

createNote = function (options) {
    let stickerEl = document.createElement('div')
    let barEl = document.createElement('div')
    let textareaEl = document.createElement('textarea')
    let temp = 400
    let noteOptions = options || {
        content: '',
        transformCSSValue: "translateX(" + Math.random() * temp + "px) translateY(" + Math.random() * temp + "px)",
        id: "id_" + new Date().getTime()
    }

    barEl.classList.add('bar')
    stickerEl.classList.add('sticker')

    let saveBtn = document.createElement('button')
    let deleteBtn = document.createElement('button')
    if (noteOptions.textarea) {
        textareaEl.style.width = noteOptions.textarea.width
        textareaEl.style.height = noteOptions.textarea.height
        textareaEl.style.resize = 'none'
    }
    let onDelete = function(){
        deleteNote(getNoteObj(stickerEl))
        document.body.removeChild(stickerEl)
    }
    let onSave = function(){
        saveNote(getNoteObj(stickerEl))
    }

    stickerEl.style.transform = noteOptions.transformCSSValue
    stickerEl.id = noteOptions.id
    textareaEl.value = noteOptions.content
    saveBtn.addEventListener('click', onSave,false)
    deleteBtn.addEventListener('click',onDelete,false)
    barEl.appendChild(saveBtn)
    barEl.appendChild(deleteBtn)
    saveBtn.classList.add('saveBtn')
    deleteBtn.classList.add('deleteBtn')
    stickerEl.appendChild(barEl)
    stickerEl.appendChild(textareaEl)
    stickerEl.addEventListener('mousedown', onDragStart, false)
    document.body.appendChild(stickerEl)
}

//usuwanie wszystkich notatek
clearNotes = function(){
    Array.from(document.querySelectorAll('.sticker')).forEach(el => el.remove());
    localStorage.clear()
}

main = function () {
    saveNote= function(note){
        localStorage.setItem(note.id, JSON.stringify(note))
        console.log(localStorage.setItem(note.id, JSON.stringify(note)))
    }
    deleteNote = function(note){
        localStorage.removeItem(note.id)
    }
    loadNotes = function(){
        for(let i = 0; i < localStorage.length; i++) {
            let savedNotes = JSON.parse(localStorage.getItem(localStorage.key(i)))
        createNote(savedNotes)
        }
    }
    loadNotes()
    
    addNoteButton = document.querySelector('.addNoteButton')
    addNoteButton.addEventListener('click', onAddNote,false)

    document.addEventListener('mousemove', onDrag, false)
    document.addEventListener('mouseup', onDragEnd, false)

    clearNotesBtn = document.querySelector('.clearNotesButton')
    clearNotesBtn.addEventListener('click', clearNotes, false)
}
main()
