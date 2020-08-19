const setURL = () => {
  const getUrl = document.querySelector('.btn-success');
  const html = `<h6>https://sampark-friends.herokuapp.com/${ROOM_ID}</h6>
                <p>Copy the above url and send it to your friends</p>`;
  document.querySelector('.paragraph').innerHTML = html;
  const propertyChange = document.getElementById('tp');
  propertyChange.disabled = false;
};

const roomIdPassing = () => {
  const room = document.getElementById('roomID');
  room.setAttribute('href', `${ROOM_ID}`);
};
