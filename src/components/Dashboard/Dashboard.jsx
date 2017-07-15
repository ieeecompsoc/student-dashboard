import React, {Component} from 'react';
import Responsive from 'react-responsive';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';

const Desktop = ({ children }) => <Responsive minWidth={768} children={children} />;
const Mobile = ({ children }) => <Responsive maxWidth={768} children={children} />;

export default class Dashboard extends Component {

  render() {
    const data = this.props.data;
    return(
        <div className="jumbotron">
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-body jumbo">
                  <Desktop>
                    <div className="img" style={{paddingLeft: "3%"}}>
                      <img
                        height="230"
                        src={data.profile_pic}
                        alt="Jetha Lall"
                        width="230"
                        className="img-rounded"
                       />
                    </div>
                  </Desktop>
                  <Mobile>
                    <div className="img">
                      <img
                        height="110"
                        src={data.profile_pic}
                        alt="Jetha Lall"
                        width="110"
                        className="img-rounded"
                       />
                   </div>
                  </Mobile>
                <div className="body">
                  <div>{data.name}</div>
                  <div><EmailIcon style={{width: "1.6rem"}}/><div><a href="mailto:jethalal@gmail.com">jethalal@gmail.com</a></div></div>
                  <div><PhoneIcon style={{width: "1.6rem"}}/><div>+91-{data.phone}</div></div>
                  <Desktop>
                    <div>Jethalal Champaklal Gada, an electronics shop-owner from Kutch district, Gujarat, and his wife Daya, father Champaklal Jayantilal Gada and son Tipendra (Tappu). He is a fan of Babita Ji</div>
                  </Desktop>
                </div>
              </div>
              <Mobile>
                <div className="panel-footer">Jethalal Champaklal Gada, an electronics shop-owner from Kutch district, Gujarat, and his wife Daya, father Champaklal Jayantilal Gada and son Tipendra (Tappu). He is a fan of Babita Ji</div>
              </Mobile>
            </div>
          </div>
        </div>
    )
  }
}
