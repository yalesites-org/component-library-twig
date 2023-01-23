Drupal.behaviors.textLink = {
  attach(context) {
    // Selectors
    const currentURL = window.location.host;
    const links = context.querySelectorAll('a');
    const linkReport = [];
    links.forEach(function (link) {
      const linkHref = link.getAttribute('href');
      const reportLine = {
        url: link.getAttribute('href'),
        status: 0,
        message: '',
        element: link,
      };
      linkReport.push(reportLine);
      // do stuff to the reportLine and link here

      if (linkHref !== currentURL) {
        console.log(`${linkHref} does not match ${currentURL}!`);
        link.classList.add('external-link');
      }
    });
    console.table(linkReport);
    console.log(currentURL);

    // const pageLinks = context.querySelectorAll('.text');

    // pageLinks.forEach((pageLink) => {
    //   const pageLinkValues = pageLink.getElementsByTagName('a');
    //   console.log(pageLinkValues);

    //   pageLinkValues.forEach((pageLinkValue) => {
    //     console.log(pageLinkValue);

    //     if (pageLinkValue !== currentURL) {
    //       console.log(`The urls don't match`);
    //     }
    //   });
    // });
  },
};
