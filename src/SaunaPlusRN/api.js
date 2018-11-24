import DeviceInfo from 'react-native-device-info';

let uniqueID = DeviceInfo.getUniqueID();
uniqueID = 'TEST';

function fetchAPIMethod(endpoint, method, payload) {
  return fetch(
    `https://snek-gc.misha.im/api${endpoint}`,
    {
      method: method || 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: payload ? JSON.stringify(payload) : undefined
    }
  ).then((r) => r.json());
}

export function book(from, to) {
  return fetchAPIMethod('/book', 'POST', {
    user_id: uniqueID,
    from, to
  });
}

export function cancelBooking() {
  return fetchAPIMethod('/cancel_booking', 'POST', {
    user_id: uniqueID
  });
}

export function getBookedSlots() {
  return fetchAPIMethod(`/get_booked_slots?user_id=${uniqueID}`, 'GET');
}

export function getLatestBooking() {
  return fetchAPIMethod(`/book?user_id=${uniqueID}`, 'GET');
}
