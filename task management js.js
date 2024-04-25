firebase.initializeapp({
    apikey:"AIzaSyB5tQ1O2trTKgEU8cgnVny9hlm5nHz4ozo",
    authdomain:"weather-app-48893.firebaseapp.com",
    projectid:"weather-app-48893",
});

const db= firebase.firestore();

function addtask(){
    const taskInput=document.getElementByid("taskinput")
    const task= taskInput.value.trim();
    if(task !==""){
        db.collection("tasks").add({
            task:task,
            timestamp:firebase.firestore.fieldvalue.serverTimestamp(),
        })
        taskInputvalue="";
    }
}
functionRendertask(doc); {
    const tasklist=document.getElementbyId("task list");
    const taskitem=document.createElement("li");
    taskItem.className='task item';
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')">Delete</button>
  `;
  taskList.appendChild(taskItem);
}
// Real-time listener for tasks
db.collection("tasks")
  .orderBy("timestamp", "desc")
  .onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
      if (change.type === "added") {
        renderTasks(change.doc);
      }
    });
  });
// Function to delete a task
function deleteTask(id) {
  db.collection("tasks").doc(id).delete();
}

