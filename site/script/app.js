async function displayUsersAndHeartbeat() {
  const mainTag = document.querySelector('main');
  mainTag.innerHTML = '';

  console.log('--- in displayUsersAndHeartbeat ---');

  const usersList = document.createElement('users-list');
  const heartbeat = document.createElement('display-heartbeat');

  document.querySelector('main').append(usersList, heartbeat);

  try {
    console.log('--- before fetch users ---');
    const responseUsers = await fetch('https://api.amelieroussin.ca/users');
    const dataUsers = await responseUsers.json();

    console.log('--- after fetch users ---');

    if (dataUsers.errorCode === 0) {
      usersList.loadUsersFromOutside(dataUsers.rows);
    } else {
      console.error('Erreur dans la réponse API des utilisateurs :', dataUsers);
    }
  } catch (err) {
    console.error('Erreur réseau ou serveur :', err);
  }
}

window.addEventListener('DOMContentLoaded', displayUsersAndHeartbeat);