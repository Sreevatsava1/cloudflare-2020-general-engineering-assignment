const links = [
                {name: 'Link1', url: ''},
                {name: 'Link2', url: ''},
                {name: 'Link3', url: ''}
              ]
const image_src = '', username = 'vatsav'

class LinksTransformer {
  constructor(links) {
    this.links = links
  }
  
  async element(element) {
    
    links.forEach(link => {
      element.append(`<a href=\"${link.url}\">${link.name}</a>`, {
        html : true
      } )
    });
  }
}

const transformer = new HTMLRewriter().on('div#links', new LinksTransformer(links))
                                      .on('div#profile', {element: (element) => element.removeAttribute('style')} )
                                      .on('img#avatar', { element : (element) => element.setAttribute('src', image_src)})
                                      .on('h1#name', { element : (element) => element.setInnerContent(username)})


addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */

async function handleRequest(request) {
  const path = new URL(request.url).pathname
  if(path == '/links')  {
    return new Response(JSON.stringify(links), {headers:{'content-type':'application/json'}})
  }
  else {
    const static_page = await fetch("https://static-links-page.signalnerve.workers.dev/")
    return transformer.transform(static_page)
  }
}
