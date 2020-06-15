url = 'http://localhost:3000/dogs';
const editForm = document.querySelector('#dog-form');
//---- get all dogs
//---- edit button to populate the top form with dog's info
//---- submit the form with patch request, update the backend and frontend

function getAllDogs() {
  return fetch(url)
    .then((response) => response.json())
    .then(function renderDogs(dogsArray) {
      showAllDogs(dogsArray);
    })
    .catch(function handleError(error) {
      console.log('there was an error fetching the data');
      console.error(error);
    });
}
function renderDogs(dogsArray) {
  showAllDogs(dogsArray);
  return dogsArray;
}

function showAllDogs(dogsArray) {
  dogsArray.forEach(function (dog) {
    showOneData(dog);
  });
}

function showOneData(dog) {
  const tdBody = document.querySelector('#table-body');

  const trDog = document.createElement('tr');
  //!!!!! to 
  trDog.setAttribute('name', dog.id);

  const nameTd = document.createElement('td');
  nameTd.innerText = dog.name;

  const breedTd = document.createElement('td');
  breedTd.innerText = dog.breed;

  const sexTd = document.createElement('td');
  sexTd.innerText = dog.sex;

  const buttonTd = document.createElement('td');




  const editButton = document.createElement('button');
  //!! h
  editButton.setAttribute('helper', dog.id);
  editButton.classList.add('edit');
  editButton.innerText = 'Edit';
  editButton.addEventListener('click', function (event) {
    event.preventDefault;
    const theDogThatBelongsToThisButton = event.target.parentNode.parentNode;

    // debugger;
    //populate the info to the form
    editForm.name.value = theDogThatBelongsToThisButton.children[0].innerText;
    editForm.breed.value = theDogThatBelongsToThisButton.children[1].innerText;
    editForm.sex.value = theDogThatBelongsToThisButton.children[2].innerText;
    //!! helper for updating frontend and sent db to backend
    // editForm.setAttribute('helper', dog.id);
    editForm.id = dog.id;
  });

  //Append to the DOM
  buttonTd.append(editButton);

  trDog.append(nameTd, breedTd, sexTd, buttonTd);

  tdBody.append(trDog);
  // console.log(tdBody);
}

editForm.addEventListener('submit', function (event) {
  event.preventDefault();
  // debugger

  const form = event.target;
  //!! helper 
  form.id = editForm.id;
  // form.id = editForm.getAttribute('helper');

  const editedDog = {
    name: form.name.value,
    breed: form.breed.value,
    sex: form.sex.value,
  };

  // send updated data to db
  return (
    fetch(url + '/' + form.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(editedDog),
    })
      .then((response) => response.json())
      //to auto refresh the page
      .then(getAllDogs())
      // update frontend manually
      .then(function updateFrontend() {
        // debugger
        const editedRow = document.getElementsByName(`${parseInt(form.id)}`);
        editedRow[0].childNodes[0].innerText = form.name.value
        editedRow[0].childNodes[1].innerText = form.breed.value
        editedRow[0].childNodes[2].innerText = form.sex.value
      })
      .catch(function handleError(error) {
        console.log('there was an error patching the data');
        console.error(error);
      })
  );
});

//--- invoke the master function
getAllDogs();

