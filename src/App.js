import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    inputWeb: '',
    inputUser: '',
    inputPassword: '',
    passwordContainer: [],
    isPresent: false,
    isShow: true,
    searchInput: '',
  }

  webInputSearch = event => {
    this.setState({inputWeb: event.target.value})
    console.log(event.target.value)
  }

  userInputSearch = event => {
    this.setState({inputUser: event.target.value})
    console.log(event.target.value)
  }

  passwordInputSearch = event => {
    this.setState({inputPassword: event.target.value})
    console.log(event.target.value)
  }

  formSubmission = event => {
    event.preventDefault()
    const {inputWeb, inputUser, inputPassword} = this.state
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const initial = inputWeb.slice(0, 1).toUpperCase()
    const formData = {
      id: v4(),
      webName: inputWeb,
      userName: inputUser,
      userPassword: inputPassword,
      classAdd: classValue,
      initialName: initial,
    }

    this.setState(prevState => ({
      passwordContainer: [...prevState.passwordContainer, formData],
      inputWeb: '',
      inputUser: '',
      inputPassword: '',
      isPresent: true,
    }))
  }

  showPasswordButton = () => {
    this.setState(prevState => ({isShow: !prevState.isShow}))
  }

  searchUserPasswords = event => {
    this.setState({searchInput: event.target.value})
    console.log(event.target.value)
  }

  DeleteItem = id => {
    const {passwordContainer} = this.state
    const newList = passwordContainer.filter(every => every.id !== id)
    const caseOf = newList.length !== 0
    this.setState({passwordContainer: newList, isPresent: caseOf})
  }

  render() {
    const {
      inputWeb,
      inputUser,
      inputPassword,
      passwordContainer,
      isShow,
      searchInput,
    } = this.state
    let {isPresent} = this.state
    const newList = passwordContainer.filter(eachValue =>
      eachValue.webName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isPresent = false
    } else {
      isPresent = true
    }

    return (
      <div className="app-container">
        <div className="app">
          <img
            alt="app logo"
            className="app-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          />
          <div className="form-container">
            <div className="responsive-container">
              <div className="input-container">
                <h1 className="heading">Add New Password</h1>
                <form onSubmit={this.formSubmission}>
                  <div className="input-search">
                    <img
                      className="web-icon"
                      alt="website"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    />
                    <input
                      type="text"
                      className="input-element"
                      placeholder="Enter Website"
                      onChange={this.webInputSearch}
                      value={inputWeb}
                    />
                  </div>
                  <div className="input-search">
                    <img
                      className="web-icon"
                      alt="username"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    />
                    <input
                      type="text"
                      className="input-element"
                      placeholder="Enter Username"
                      onChange={this.userInputSearch}
                      value={inputUser}
                    />
                  </div>
                  <div className="input-search">
                    <img
                      className="web-icon"
                      alt="password"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                    />
                    <input
                      type="password"
                      className="input-element"
                      placeholder="Enter Password"
                      onChange={this.passwordInputSearch}
                      value={inputPassword}
                    />
                  </div>
                  <div className="button-container">
                    <button type="submit" className="button">
                      Add
                    </button>
                  </div>
                </form>
              </div>
              <img
                alt="password manager"
                className="password-img"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              />
            </div>
          </div>
          <div className="form-container2">
            <div className="responsive">
              <div className="flex-container-2">
                <div className="Password-container">
                  <h1 className="yourPassword">Your Passwords</h1>
                  <p className="span-input">{newList.length}</p>
                </div>
                <div className="search-container">
                  <img
                    className="search-icon"
                    alt="search"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  />
                  <input
                    type="search"
                    className="search-input"
                    placeholder="Search"
                    onChange={this.searchUserPasswords}
                  />
                </div>
              </div>
              <hr />
              <div className="show-password">
                <input
                  type="checkbox"
                  id="check"
                  onClick={this.showPasswordButton}
                />
                <label htmlFor="check" className="label">
                  Show Passwords
                </label>
              </div>
              {!isPresent && (
                <div className="empty-state">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    className="empty-image"
                    alt="no passwords"
                  />
                  <p className="no-passwords">No Passwords</p>
                </div>
              )}
              {isPresent && (
                <ul className="result-container">
                  {newList.map(every => (
                    <li className="item-list" key={every.id} id={every.id}>
                      <p className={`profile ${every.classAdd}`}>
                        {every.initialName}
                      </p>
                      <div className="list-content">
                        <p className="website">{every.webName}</p>
                        <p className="website">{every.userName}</p>
                        {isShow && (
                          <img
                            className="stars-image"
                            alt="stars"
                            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          />
                        )}
                        {!isShow && (
                          <p className="website">{every.userPassword}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        className="del-btn"
                        onClick={() => this.DeleteItem(every.id)}
                        data-testid="delete"
                      >
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                          className="del-image"
                          alt="delete"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
