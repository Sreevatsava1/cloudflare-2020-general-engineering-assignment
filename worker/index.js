const links = [
                {name: 'Youtube', url: 'https://www.youtube.com'},
                {name: 'Cloud Flare', url: 'https://www.cloudflare.com'},
                {name: 'Among US', url: 'https://store.steampowered.com/app/945360/Among_Us/'}                
              ]
const image_src = 'https://lh3.googleusercontent.com/-X7UwN81Iweo/WvW8xYawyWI/AAAAAAAAEQQ/qBxfWTd8agwHIvPT0yF5OsAxTa8fd2xhgCEwYBhgLKtMDAL1OcqxTOShfGcT3vmOMaYOoxGuUcc6YK2vtHDNJuf76IB3uQClBocO-OD6Gn9ENz7yntoXZrpWhHNyCgbKOYSNGI0GNvF2WTGJB9mS180mJtqanV0oJCjDXZ2TIc5kfItFn-Wu6h-RJLXur5LICHM4mepVH-zMDyD8ckoXF_ebKV9AdlkgTo_e1k3QykXhnWEummI36GbtAMbC5-4p9OaBTQCS0E3HLKy245ZkYqJZQy45WdAi5z5dqUm_ru5NxxaPHmQqiUgHrBb36VzEgEVgxjHwtKliVQkd47cIYEe_p3OUu8Cwp5Dm1BneDd6gNyGxOhM-yUKKLGoFjZDRXVXm3koiJAKEnOy5wREpoI1nEuU1ANKpkO0OH4kVu8FTuGpjfAXOwChOeCaCMxuLA4JFJoiiD6Zz6MXZOqlEPRkb5hSxeiK7AHyXDtkmaAbH9rbCOAMRQWc0maVIFK5CKeIJBgsYkR67G5RLZ1nq9hJ7-NJy6GxJl1gB_SH5tHk_h6eCcioUIYNQgPFCR_OqheRjr82Jg7deqWBiupeNg6ucIBReWpwxL_mBy3KOeMShWGJH2_QrEeU0YfDJbYCpkfLlFWDAm1xFLKAndUtfb5kDR3vMw1Mit_AU/w278-h280-p/PSX_20180104_202555.jpg', 
      username = 'VatsaV', title = 'Cloud Flare'

const social_links = [
                       {url : 'https://www.instagram.com/sreevatsava_griddaluru/', svg :'https://simpleicons.org/icons/instagram.svg'},
                       {url : 'https://www.linkedin.com/in/sreevatsava-griddaluru/', svg : 'https://simpleicons.org/icons/linkedin.svg'},
                       {url : 'https://github.com/Sreevatsava1', svg : 'https://simpleicons.org/icons/github.svg'}
                      ]
class LinksTransformer {

  constructor(links) {
    this.links = links
  }

  async element(element) {
    links.forEach(link => {
      element.append(`<a href=\'${link.url}\'>${link.name}</a>`, {html : true} )
    });
  }
}

class SocialTransformer {

  constructor(social_links) {
    this.social_links = social_links
  }

  async element(element) {
    social_links.forEach(link => {
      element.append(`<a href = ${link.url}><svg><img src = ${link.svg}></svg></a>`, {html : true} )
    });  
  }
}

const transformer = new HTMLRewriter().on('div#links', new LinksTransformer(links))
                                      .on('div#profile', {element: (element) => element.removeAttribute('style')} )
                                      .on('img#avatar', { element : (element) => element.setAttribute('src', image_src)})
                                      .on('h1#name', { element : (element) => element.setInnerContent(username)})
                                      .on('div#social', {element: (element) => element.removeAttribute('style')})
                                      .on('div#social', new SocialTransformer(social_links))
                                      .on('title', { element : (element) => element.setInnerContent(title)})
                                      .on('body', { element : (element) => element.setAttribute('class', 'bg-gradient-to-r from-red-600 to-blue-600')})


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
