const SW_VERSION = '1.0.14';

self.addEventListener('message', (event) => {
  if (event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage(SW_VERSION);
  }
  if (event.data.type === 'NOTIFY') {
    self.registration.showNotification(`New Notification!, ${SW_VERSION}`, {
      actions: [
        { action: 'accept', title: 'Accept' },
        { action: 'decline', title: 'Decline' },
      ],
    });
    event.ports[0].postMessage(event.data);
  }
});

self.addEventListener('notificationclick', (event) => {
  console.log('Notification click:', event.action);

  // event.notification.close(); // optional: close notification

  // Handle actions
  if (event.action === 'accept') {
    // User clicked "Accept"
    console.log('/accept?data=123');
    event.waitUntil(
      clients.openWindow('/accept/lol2?data=456') // redirect to a page
    );
  } else if (event.action === 'decline') {
    // User clicked "Decline"
    event.waitUntil(
      clients.openWindow('/decline')
    );
  } else {
    // User clicked on notification body (not on action button)
    event.waitUntil(
      clients.openWindow('/') // default action
    );
  }
});

