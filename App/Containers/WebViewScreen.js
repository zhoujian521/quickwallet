import React, { Component } from 'react';
import { WebView, Share, Platform } from 'react-native';
import { connect } from 'react-redux';
import styles from './Styles/WebViewScreenStyle';
import RightComponent from '../Components/RightComponent';

const DEFAULT_URI = 'http://litex.io/';

class WebViewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
      title:'WebView',
      headerRight: (
          <RightComponent
              onPressRefresh={navigation.getParam('onPressRefresh')}
              onPressShare={navigation.getParam('onPressShare')}/>
      ),
  });

  componentDidMount() {
      this.props.navigation.setParams({ onPressRefresh: this._onPressRefresh });
      this.props.navigation.setParams({ onPressShare: this._onPressShare });
  }


_onPressRefresh=()=>{
    this.webview.reload();
}

_onPressShare= async ()=>{
    const title = '消息的标题';
    const message = '要分享的消息';
    let shareParams = {title, message};
    if (Platform.OS === 'ios') {
        const url = 'https://github.com/facebook/react-native';
        const subject = '通过邮件分享的标题';
        shareParams = {url, subject, ...shareParams};
    } else {
        const dialogTitle = 'Android==>dialogTitle';
        shareParams = {dialogTitle, ...shareParams};
    }

    try {
        const result = await Share.share(shareParams);
        const {action, activityType} = result;
        if (action === Share.sharedAction) {
            if (activityType) {
                console.log(activityType);
            } else {
                console.log(activityType);
            }
        } else if (action === Share.dismissedAction){
            console.log(Share.dismissedAction);
        }
    } catch (error) {
        console.log(error);
    }
}

render () {
    const uri = DEFAULT_URI;
    return (
        <WebView useWebKit
            ref ={ref=>this.webview = ref}
            style={styles.container}
            source={{uri}}/>
    );
}
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WebViewScreen);


