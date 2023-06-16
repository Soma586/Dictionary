import { useState,  } from 'react'
import _, { identity } from 'lodash'
import './styles.scss'
import '../scss/typography.scss'
import Details from './details'
import SearchIcon from '../assets/images/icon-search.svg'
import classNames from 'classnames'
import PlayIcon from '../assets/images/icon-play.svg'
import Logo from '../assets/images/logo.svg'

const Search = () => {



    const [data, setData] = useState([])
    const [input, setInput] = useState('')
    const [isError, setError] = useState(false)
    const [foundDef, setfoundDef] = useState(true)

    const handleEnterKey = (e) => {

        if(e.key === 'Enter'){

            if(input !== ""){
            
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}` )
            .then(res => res.json())
            .then((res) => {

                if(_.get(res, 'title')){
 
                    setData(res)
                    setfoundDef(false)
                }else{
                    setData(res[0])
                    setfoundDef(true)
                }
                 
            })
            .catch(()=> console.log("there was an error"))
            setError(false)

        }else{

            setError(true)
        }

    }
    }

    const sourceLink = _.get(data, 'sourceUrls[0]')


    const handleInput  = (event) => {


        setInput(event.target.value)

    }

  

    const test = () => {


        let filteredAudio = _.filter(_.get(data, 'phonetics'), (x) =>{
            return x.audio !== '';
        })
        let audio = new Audio(_.get(filteredAudio, '[0].audio'))



        return (
            <div className="details d-flex justify-content-between">

                <div>
                <h1 className="type__HeadingL">{_.get(data, 'word')}</h1>
                <p className="type__HeadingM phonetic">  {_.get(data, 'phonetic')}</p>
                </div>
               
                <div className="wtf" >
                <svg onClick={() => audio.play()} xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75"><g fill="#A445ED" fill-rule="evenodd"><circle cx="37.5" cy="37.5" r="37.5" opacity=".25"/><path d="M29 27v21l21-10.5z"/></g></svg>
                </div>
                
            </div>
        )
    }

    const details = _.map(_.get(data, 'meanings'), (means) => {
        return (
            <Details 
            partOfSpeech={_.get(means, 'partOfSpeech')}
            meanings={_.get(means, 'definitions')}
            synonyms={_.get(means, 'synonyms')}
            
            />
        )
    })


    const NothingWasFound = () => {

        const message = _.get(data, 'message') + " " + _.get(data, 'resolution')

        return (
            <div className="nothingContainer">
                <p className="emoji"> 😕</p>
                    <p> {_.get(data, 'title')}</p>
                    <p>{message}</p>
                </div>
        )
    }

    const Nav = () => {

        return (
            <div>
                <img src={Logo} />
            </div>
        )
    }


    return (
        <div className="searchContainer container">
            
            <div className="inputContainer">
                <input onKeyUp ={handleEnterKey} 
                type="string" 
                className={classNames("type__HeadingS", isError && 'error')}
                placeholder="Search for any word..."
                onChange={handleInput}
                value={input}
                
                />
                
                    <img  className="searchIcon" src={SearchIcon}/>

        {isError && 
            <p className="errorMessage type__BodyS"> Whoops, can't be empty...</p>
        }  
                
            </div>
            {(!_.isEmpty(data) && foundDef) &&
            <div>
              {test()}
              {details}

            
            <div>
              <hr></hr>
              <p><span>Source</span>  <a href={sourceLink}>{sourceLink}</a></p>
              </div>
            
            </div> 
            }

            {
                (!_.isEmpty(data) && !foundDef) && 
                <NothingWasFound/>
            }
        </div>
    )

}




export default Search