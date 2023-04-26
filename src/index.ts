import { app } from './app'

const PORT = (process.env.PORT ?? '8001') as string

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
