
import { html } from "./renderHtml.js";
import * as db from "./db"
import { AutoRouter, cors } from 'itty-router'
import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';

const { preflight, corsify } = cors({
  origin: '*',
}) //'https://moonlab.top', 'https://*.moonlab.top',

const router = AutoRouter({
  before: [preflight],  // add preflight upstream
  finally: [corsify],   // and corsify downstream
})

router.get('/', (req, env) => {
  db.initDB(env.DATABASE);
  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8'
    }
  })
})

router.get('/genavatar', (req, env) => {
  const avatar = createAvatar(thumbs, {
    seed: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
  });
  const svg = avatar.toString();

  return new Response(svg, {
    headers: {
      'content-type': 'image/svg+xml;charset=UTF-8'
    }
  })
})

router.get('/api/get', async (req, env) => {
  let id = req.query.page_id;
  let offset = req.query.skip;
  if (!id) {
    return new Response('Invalid Request', { status: 400 })
  }
  const comments = await db.getComments(env.DATABASE, id)
  console.log(comments.results)
  return new Response(comments.results, {
    headers: {
      'content-type': 'text/json;charset=UTF-8'
    }
  })
})

router.post('/api/submit', async (request, env) => {
  try {
    var comment = await request.json()
  } catch (error) {
    console.log(error)
    return new Response('Invalid Request', { status: 400 })
  }
  const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for')
  const ua = request.headers.get('user-agent')
  comment.ip = ip;
  comment.ua = ua;
 
  // console.log(`[${new Date().toISOString()}] ${ip} - ${ua} - ${JSON.stringify(comment)}`)
  let err = db.createComment(env.DATABASE, comment)
  if(err) {
    return new Response('Error: ' + err, { status: 503 })
  }
  return new Response('OK', {
    headers: {
      'content-type': 'text/plain;charset=UTF-8'
    }
  })
})


export default {
  fetch: router.fetch
};
