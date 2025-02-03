Drupal.behaviors.launchChat = {
  attach(context) {
    const launchChatButton = context.querySelectorAll(
      '.cta[data-cta-control-type=chat-app]',
    );

    if (launchChatButton.length === 0) {
      return;
    }

    launchChatButton.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        alert('Chat launched');
      });
    });
  },
};
