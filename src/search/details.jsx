import './styles.scss'
import _ from 'lodash'
import classNames from 'classnames'

const Details  = (props) => {


    const {className ,partOfSpeech, meanings, synonyms } = props


    const definationList = _.map(meanings, (data) => {
        return (
            <li className="type__HeadingS mb-2">
                {_.get(data, 'definition')}
            </li>
        )
    })

    const example = _.get(meanings, '[0].example')

    // console.log(meanings)
    // console.log(example)



    const synonymsList = _.join(synonyms , ", ")

    return (
        <div>
            <div className="d-flex mt-4 mb-4">
                <p className="leftDiv type__HeadingS ">{partOfSpeech}</p>
                <div className="rightDiv">
                 <hr />
                 </div>
            </div>

            <div>
                <h3 className="type__HeadingM synonymHeading">Meaning</h3>

                <ul>
                {definationList}
                </ul>

                {_.get(meanings, '[0].example') && 
                    <p className="synonymHeading type__HeadingS">"{_.get(meanings, '[0].example')}"</p>
                }


                    {!_.isEmpty(synonyms) && 
                   
                <p className="synonym type__HeadingS">  <span className=" synonymHeading">Synonyms</span> {synonymsList}</p>
                
                    }
                


            </div>


        </div>
    )

}



export default Details