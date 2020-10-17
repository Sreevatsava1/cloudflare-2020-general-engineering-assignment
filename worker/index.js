const links = [
                {name: 'Link1', url: ''},
                {name: 'Link2', url: ''},
                {name: 'Link3', url: ''}
              ]



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
}
