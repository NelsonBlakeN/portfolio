import React from "react"
import './App.css'

const links = [
  {
    link: "https://linkedin.com/in/blakenelson19",
    text: "LinkedIn",
  },
  {
    text: "GitHub",
    link: "https://github.com/NelsonBlakeN",
  },
  {
    text: "Pluralsight",
    link: "https://app.pluralsight.com/profile/blake-nelson-30",
  },
  {
    text: "LeetCode",
    link: "https://leetcode.com/frostedblakes/",
  },
  {
    text: "Contact",
    link: "mailto:mail@blakenelson.me"
  }
]

const App = () => {
  return (
    <div className="App">
      <h1>
        Blake Nelson
      </h1>
      <h3>
        Developer
      </h3>
      <div className="button-list">
        {links.map(link => (
          <a href={link.link} className="border-link">
            {link.text}
          </a>
        ))}
      </div>
    </div>
  )
}

export default App