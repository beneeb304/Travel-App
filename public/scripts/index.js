console.log('Hello World!')
const listView = document.querySelector('#lstLocs')
const slcTitle = document.querySelector('#slcTitle')
const slcBody = document.querySelector('#slcBody')
const slcRating = document.querySelector('#slcRating')
const slcLocation = document.querySelector('#slcLocation')
const slcImage = document.querySelector('#slcImage')
const slcCard = document.querySelector('#slcCard')
const slcDate = document.querySelector('#slcDate')
const inputForm =document.querySelector('form')

const getAllEntries = ()=>{
   
    clearList(listView)
    
    fetch('/entries').then((response) =>{
        response.json().then((data)=>{
            console.log(data)
            if (data.error){
                const tmpItem=document.createElement("button")
                tmpItem.innerHTML = "Error loading data. Please try again"
                tmpItem.classList.add("list-group-item")
                listView.appendChild(tmpItem) 
            }   
            else{
                console.log('Success: Now loading data');
                for (let i=0;i<data.length;i++){
                    const tmpItem=document.createElement("button")
                    tmpItem.innerHTML = '<button type=button class="list-group-item list-group-item-action">'+data[i].title+'</button>'
                    tmpItem.addEventListener('click',()=>{showEntry(data[i]._id)})
                    console.log(tmpItem.innerHTML)
                    tmpItem.classList.add("list-group-item")
                    listView.appendChild(tmpItem) 
                }
                
            }
                
        })
    })
    
}

const clearList=(listView)=>{
    while (listView.firstChild)
    listView.removeChild(listView.firstChild)
}

const showEntry=(id)=>{
    slcCard.classList.remove('d-none')
    console.log(id)
    fetch('/entries/'+id).then((response) =>{
        response.json().then((data)=>{
            console.log(data)
            if (data.error){
                slcTitle.innerHTML = "Error loading data. Please try again"
            }   
            else{
                console.log('Success: Now loading data');      
                slcTitle.innerHTML=data.title
                slcBody.innerHTML=data.description
                slcRating.innerHTML='User Rating : '+data.rating+' / 10'
                slcLocation.innerHTML='Location : '+data.latitude+', '+data.longitude
                slcDate.innerHTML='Posted on '+new Date(data.dateVisited).toDateString()
               // slcImage.innerHTML ='<img id="slcImage" class="card-img-top" src="'+data.image+'" ">'
               slcImage.src=data.image
        
            }
                
        })
    })

}

inputForm.addEventListener('submit',(e)=>{
    console.log('here')
    e.preventDefault()
    console.log('here2')
    const title = document.querySelector('#title');
    const des = document.querySelector('#body');
    const rating = document.querySelector('#rating');
    const lat = document.querySelector('#lat');
    const lon = document.querySelector('#lon');
    const image = document.querySelector('#imageURL');
    const visitDate=document.querySelector('#date')

    const post_request_object={
        "title": title.value,
        "description": des.value,
        "image": image.value,
        "rating": rating.value,
        "latitude": lat.value, 
        "longitude":  lon.value,
        "dateVisited": visitDate.value
    }

    fetch('/entries/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(post_request_object),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            getAllEntries()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
})


slcCard.classList.add('d-none')
getAllEntries()