const Hello4: React.FC = () => {
  const createFormAndSubmit = async () => {
    // console.log('createFormAndSubmit')
    const form = document.createElement('form') satisfies HTMLFormElement
    form.action = import.meta.env.VITE_API_URL
    form.method = 'POST'
    document.body.append(form)
    form.submit()
  }

  return (
    <div>
      <h1>Hello4</h1>
      <button onClick={createFormAndSubmit}>Create Form and Submit</button>
    </div>
  )
}

export default Hello4
