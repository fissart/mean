import React, { useEffect, useState } from "react";
import { Platform, useWindowDimensions, ScrollView, TextInput, TouchableOpacity, Text, StyleSheet, Image,  Modal, Pressable,  } from "react-native";
//import { saveTask, getPhoto, updateTask } from "../api";
import ImagePicker from 'react-native-image-crop-picker';
import { View, Button, Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { createStackNavigator } from "@react-navigation/stack";
import { useIsFocused, NavigationContainer } from "@react-navigation/native";
import Axios from "axios";
import { ProgressBar } from "@react-native-community/progress-bar-android";
import envs from '../config/env';
import { Icon } from 'react-native-elements'
import MathJax from 'react-native-mathjax';
import RenderHtml from 'react-native-render-html';
import { WebView } from 'react-native-webview';
import FileViewer from "react-native-file-viewer";
// Import DocumentPicker to pick file to view
import DocumentPicker from 'react-native-document-picker';

import RNFS from "react-native-fs";
import {
  useHtmlIframeProps,
  HTMLIframe,
  iframeModel
} from '@native-html/iframe-plugin';
const APImg = envs.BACKEND_URL
const APIww = `${envs.BACKEND_URL}/api/photos`
const API = `${envs.BACKEND_URL}/api`
const API2 = `${envs.BACKEND_URL}/api/photos2`

const TaskFormScreen = ({ navigation, route }) => {


  const selectOneFile = async () => {
      // To Select File
      try {
        const res = await DocumentPicker.pick({
          // Provide which type of file you want user to pick
          type: [DocumentPicker.types.allFiles],
          // There can me more options as well
          // DocumentPicker.types.allFiles
          // DocumentPicker.types.images
          // DocumentPicker.types.plainText
          // DocumentPicker.types.audio
          // DocumentPicker.types.pdf
        });
        console.log(res[0].uri);
        console.log(res.uri);
        if (res) {
          let uri = res[0].uri;
          if (Platform.OS === 'ios') {
            // Remove 'file://' from file path for FileViewer
            uri = res.uri.replace('file://', '');
          }
          console.log('URI : ' + uri);
          FileViewer.open(uri)
            .then(() => {
              // Do whatever you want
              console.log('Success');
            })
            .catch(_err => {
              // Do whatever you want
              console.log(_err);
            });
        }
      } catch (err) {
        // Handling Exception
        if (DocumentPicker.isCancel(err)) {
          // If user canceled the document selection
          alert('Canceled');
        } else {
          // For Unknown Error
          alert('Unknown Error: ' + JSON.stringify(err));
          throw err;
        }
      }
    };


  const  showFile = async (fileUrl) => {
    const url =fileUrl;
    //"https://github.com/vinzscam/react-native-file-viewer/raw/master/docs/react-native-file-viewer-certificate.pdf";

    // *IMPORTANT*: The correct file extension is always required.
    // You might encounter issues if the file's extension isn't included
    // or if it doesn't match the mime type of the file.
    // https://stackoverflow.com/a/47767860
    function getUrlExtension(url) {
      return url.split(/[#?]/)[0].split(".").pop().trim();
    }

    const extension = getUrlExtension(url);

    // Feel free to change main path according to your requirements.
    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;


    const options = {
      fromUrl: url,
      toFile: localFile,
    };

    console.log(options);

    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then(() => {
        // success
      })
      .catch((error) => {
        // error
      });
}

  const isFocused = useIsFocused();
  const [task, setTask] = useState({
    title: "",
    description: "",
    imagePath: "",
    editing: false,
    text: "",
  });
  const [theme, setTheme] = useState({
    titulo: "",
    contenido: "",
    tarea: "",
  });
  const [w, setWwwww] = useState([])
const { width } = useWindowDimensions();
  const [editing, setEditing] = useState(false);
  const [rol, setRol] = useState();
  const [user, setUser] = useState();
  const [text, setText] = useState();
  const [img, setImg] = useState();
  const [uploadPercentage, setUploadPercentage] = useState(0);
const [modalVisible, setModalVisible] = useState(false);


const getCurse = async () => {
    const curse = route.params.CurseId;
    const user = route.params.UserId;

    try {
        if (curse && user) {
          const res = await fetch(`${API}/curses/ControllerAll/${curse}/${user}`, {
            method: "GET",
          });
          const ww =  await res.json();
          console.log(ww)

          setWwwww(ww);
          setTask({ title: ww[0].title, description:  ww[0].description, imagePath:  ww[0].img });

        }
    } catch (error) {
        console.log(error);
    }
};

  useEffect(async () => {
      let mounted = true

      const value = await AsyncStorage.getItem('rol');
      const ww = await AsyncStorage.getItem('user');
      setRol(value)
      setUser(ww)

      navigation.setOptions({ headerTitle: "Curso" });

      await getCurse();

      return () => {
        setState({});
      };

    return function cleanup() {
      mounted = false
    }

  }, [isFocused]);


  const pickSingleWithCamera = (cropping, mediaType = 'photo') => {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then((image) => {
        console.log('received image', image);
        setImg({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch((e) => console.log(e));
  }
  const pickSingle = (cropit, circular = false, mediaType) => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then((image) => {
        console.log('received image', image);
        setImg({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch((e) => {
        console.log(e);

      });
  }

  const renderImage = (image) => {
    //console.log(image.image.uri)
    return (
      <Image
        style={{ width: 300, height: 300, resizeMode: 'contain' }}
        source={{
          uri: image.image.uri
        }}
      />
    );
  }

  const renderAsset = (image) => {
    return renderImage(image);
  }


  const handleSubmit = async () => {
    try {

        const data = new FormData();
        if (img) {
          data.append('image', {
            uri: img.image.uri,
            type: img.image.mime,
            name: "photo.jpg",
          })
        } else {
          //          data.append('image', {})
        }
        data.append('title', task.title);
        data.append('description', task.description);
        console.log(data);
        //data.append('imagePath', task.imagePath);
        const options = {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total)
            console.log(`${loaded}kb of ${total}kb | ${percent}%`);
            if (percent < 100) {
              setUploadPercentage(percent)
            }
          }
        }
          await Axios.put(`${API}/curses/Controller/${route.params.CurseId}`, data, options).then(res => {
            setUploadPercentage(100);
            navigation.navigate("Inicio");
          });

    } catch (error) {
      console.log(error);
    }
  };



  const handleChange = (name, value) => {
    setTask({ ...task, [name]: value });
    //console.log(name,value)
  };

  const IframeRenderer = function IframeRenderer(props) {
    const iframeProps = useHtmlIframeProps(props);
    // Do customize the props here; wrap with your own container...
    return <HTMLIframe {...iframeProps} />;
  };


  const renderers = {
  iframe: IframeRenderer
};



const customHTMLElementModels = {
  iframe: iframeModel
};
  return (
    <ScrollView style={{ backgroundColor: "#fff"}}>
      {rol==1 ?
      <View style={{
        paddingTop: 5,
        flex: 1,
        alignItems: "center",
      }}>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#000"
          value={task.title}
          onChangeText={(text) => handleChange("title", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Subnombre"
          placeholderTextColor="#000"
          value={task.description}
          onChangeText={(text) => handleChange("description", text)}
        />

        <TouchableOpacity
          onPress={() => pickSingleWithCamera(false)}
          style={styles.buttonUpdate}
        >
          <Text style={styles.buttonText}>Cámara</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => pickSingle(false)}
          style={styles.buttonUpdate}
        >
          <Text style={styles.buttonText}>Imágen</Text>
        </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Update curso</Text>
          </TouchableOpacity>


        {img && task.imagePath ? renderAsset(img) : <Image style={{ width: 300, height: 300, resizeMode: 'contain' }}
          source={{
            uri: `${APImg}/${task.imagePath}`
          }}
        />}
        {img ?
          <>
            <View style={{ marginVertical: 5 }}>
              <Text>Fixed Progress Value {uploadPercentage}%</Text>
              <ProgressBar
                styleAttr="Horizontal"
                indeterminate={false}
                progress={uploadPercentage / 100}
              />
            </View>

          </>
          : null
        }
      </View>
    :null}


    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <ScrollView style={{width:"100%"}}>
          <Text style={{color:'white', fontSize: 15, textTransform: 'uppercase', backgroundColor:"rgb(0, 100, 100)", padding:7}}>{theme.titulo}</Text>
            <MathJax
              html={theme.contenido}
              mathJaxOptions={{
                messageStyle: 'none',
                extensions: [ 'tex2jax.js' ],
                jax: [ 'input/TeX', 'output/HTML-CSS' ],
                tex2jax: {
                  inlineMath: [ ['$','$'], ['\\(','\\)'] ],
                  displayMath: [ ['$$','$$'], ['\\[','\\]'] ],
                  processEscapes: true,
                },
                TeX: {
                  extensions: ['AMSmath.js','AMSsymbols.js','noErrors.js','noUndefined.js']
                }
              }}
            />
            <Text style={{color:'white', fontSize: 15, textTransform: 'uppercase', backgroundColor:"rgb(0, 100, 100)", padding:7}}>Tarea</Text>
            <MathJax

              html={theme.tarea}

              mathJaxOptions={{
                messageStyle: 'none',
                extensions: [ 'tex2jax.js' ],
                jax: [ 'input/TeX', 'output/HTML-CSS' ],
                tex2jax: {
                  inlineMath: [ ['$','$'], ['\\(','\\)'] ],
                  displayMath: [ ['$$','$$'], ['\\[','\\]'] ],
                  processEscapes: true,
                },
                TeX: {
                  extensions: ['AMSmath.js','AMSsymbols.js','noErrors.js','noUndefined.js']
                }
              }}
            />

            </ScrollView>

            <TouchableOpacity style={{paddingTop: 10, paddingBottom: 10, borderRadius: 5,  marginTop: 5, backgroundColor: "#10ac84", width: "100%"}} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>



          </View>
        </View>
      </Modal>

    </View>

      {w ? w.map((www, index) => (
      <View style={{alignItems: 'center',
      justifyContent: 'center',color:'white',paddingHorizontal: 5, paddingVertical: 5}} key={index.toString()}>
      <Text style={{color:'blue', fontSize: 20, textTransform: 'uppercase'}}>{www.title}</Text>
      {rol==1?<Text style={{color:'blue'}}>{rol} </Text>:null}
      <Image style={{ width: '89%', height: 100, resizeMode: 'cover', borderRadius:10 }}
        source={{
          uri: `${APImg}/${www.img}`
        }}
      />
      <View style={{flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      justifyContent: 'center'}}>
      {www.unidades.map((ww, index) => (
      <View style={{ width: "48%", padding: 5, alignItems: "center",    backgroundColor:  "rgb(2250,250,250)", paddingVertical: 5,paddingHorizontal: 5, borderRadius: 5,    margin: 2}} key={index.toString()}>
      <Text style={{color:'blue'}}>{ww.title}</Text>
      <View style={{flexWrap: 'wrap',      flexDirection: 'row',      justifyContent: 'space-between',      justifyContent: 'center', paddingVertical: 5,paddingHorizontal: 5,
        borderRadius: 5,    margin: 0}}>
      {ww.temas.map((w, index) => (
      <View style={{ width: "30%", padding: 5, alignItems: "center", justifyContent: "center",     borderWidth: 1,
          borderColor: "rgb(250, 100, 250)",
  backgroundColor:  "rgb(250,200,200)", paddingVertical: 5,paddingHorizontal: 5, borderRadius: 5,    margin: 1}} key={index.toString()}>
      <TouchableOpacity
        onPress={() => {setModalVisible(true);
          setTheme({titulo: w.title, contenido: w.description, tarea: w.task})}}
      >
      <Icon
          reverse
          size={15}
          name='pulse'
          color='rgb(0,100,200)'
          type='ionicon'
          style={{shadowColor: 'black',
                shadowOpacity: 0.5,
                shadowRadius: 5,
        textShadowOffset:{width: 10,height: 10}}}
       />
       </TouchableOpacity>

       <TouchableOpacity
       onPress={() =>  {showFile(`${APImg}/${w.img}`)}}
       style={styles.shadow}
     >
       <Icon
           reverse
           size={15}
           color='rgb(10,80,200)'
           type='ionicon'
           name='document-attach'
       />
       </TouchableOpacity>

{w.usertask.length==0?
  <TouchableOpacity
  onPress={() => {navigation.navigate("Task", { CurseId: www._id, UnityId: ww._id, ThemeId: w._id, UserId: user })}}
  style={styles.shadow}

   >
      <Icon
          reverse
          size={15}
          color='rgb(250,180,0)'
          type='ionicon'
          name='create-outline'
          style={styles.shadow}
      />

      </TouchableOpacity>

:null}
      {w.usertask.map((task, index) => (
      <View key={index.toString()}>
      <TouchableOpacity
      onPress={() => navigation.navigate("Task", { Id: task._id })}
      style={styles.shadow}
       >
      <Icon
          reverse
          size={15}
          color='rgb(0,150,0)'
          style={styles.shadow}
          name='edit'
      />
      </TouchableOpacity>

      </View>
      ))}

      </View>
      ))}
      </View>
      </View>
      ))}
      </View>
      </View>
      )): <></>}

    </ScrollView>

  );
};

const styles = StyleSheet.create({
  input: {
    width: "90%",
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#10ac84",
    height: 30,
    color: "#000",
    //    textAlign: "center",
    padding: 4,
    borderRadius: 5,
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    margin: 3,
    backgroundColor: "#10ac84",
    width: "90%",
  },
  buttonUpdate: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    backgroundColor: "skyblue",
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  input: {
    width: "90%",
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#10ac84",
    height: 30,
    color: "#000",
    //    textAlign: "center",
    padding: 4,
    borderRadius: 5,
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    margin: 3,
    backgroundColor: "#10ac84",
    width: "90%",
  },
  buttonUpdate: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    backgroundColor: "skyblue",
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },

  centeredView: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(250,250,250,0.7)',
  },
  modalView: {
    width:'100%',
    height:'100%',
    backgroundColor: 'rgba(100,100,200,0.7)',
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: {
      width: 2,
      height: 8
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    padding: 5,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  shadow:{
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 5
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 15
  }
});

export default TaskFormScreen;


/*
 Warning: Failed prop type: Invalid prop `name` of value `homework` supplied to `Icon`, expected one of ["glass","music","search","envelope-o","heart","star","star-o","user","film","th-large","th","th-list","check","remove","close","times","search-plus","search-minus","power-off","signal","gear","cog","trash-o","home","file-o","clock-o","road","download","arrow-circle-o-down","arrow-circle-o-up","inbox","play-circle-o","rotate-right","repeat","refresh","list-alt","lock","flag","headphones","volume-off","volume-down","volume-up","qrcode","barcode","tag","tags","book","bookmark","print","camera","font","bold","italic","text-height","text-width","align-left","align-center","align-right","align-justify","list","dedent","outdent","indent","video-camera","photo","image","picture-o","pencil","map-marker","adjust","tint","edit","pencil-square-o","share-square-o","check-square-o","arrows","step-backward","fast-backward","backward","play","pause","stop","forward","fast-forward","step-forward","eject","chevron-left","chevron-right","plus-circle","minus-circle","times-circle","check-circle","question-circle","info-circle","crosshairs","times-circle-o","check-circle-o","ban","arrow-left","arrow-right","arrow-up","arrow-down","mail-forward","share","expand","compress","plus","minus","asterisk","exclamation-circle","gift","leaf","fire","eye","eye-slash","warning","exclamation-triangle","plane","calendar","random","comment","magnet","chevron-up","chevron-down","retweet","shopping-cart","folder","folder-open","arrows-v","arrows-h","bar-chart-o","bar-chart","twitter-square","facebook-square","camera-retro","key","gears","cogs","comments","thumbs-o-up","thumbs-o-down","star-half","heart-o","sign-out","linkedin-square","thumb-tack","external-link","sign-in","trophy","github-square","upload","lemon-o","phone","square-o","bookmark-o","phone-square","twitter","facebook-f","facebook","github","unlock","credit-card","feed","rss","hdd-o","bullhorn","bell","certificate","hand-o-right","hand-o-left","hand-o-up","hand-o-down","arrow-circle-left","arrow-circle-right","arrow-circle-up","arrow-circle-down","globe","wrench","tasks","filter","briefcase","arrows-alt","group","users","chain","link","cloud","flask","cut","scissors","copy","files-o","paperclip","save","floppy-o","square","navicon","reorder","bars","list-ul","list-ol","strikethrough","underline","table","magic","truck","pinterest","pinterest-square","google-plus-square","google-plus","money","caret-down","caret-up","caret-left","caret-right","columns","unsorted","sort","sort-down","sort-desc","sort-up","sort-asc","envelope","linkedin","rotate-left","undo","legal","gavel","dashboard","tachometer","comment-o","comments-o","flash","bolt","sitemap","umbrella","paste","clipboard","lightbulb-o","exchange","cloud-download","cloud-upload","user-md","stethoscope","suitcase","bell-o","coffee","cutlery","file-text-o","building-o","hospital-o","ambulance","medkit","fighter-jet","beer","h-square","plus-square","angle-double-left","angle-double-right","angle-double-up","angle-double-down","angle-left","angle-right","angle-up","angle-down","desktop","laptop","tablet","mobile-phone","mobile","circle-o","quote-left","quote-right","spinner","circle","mail-reply","reply","github-alt","folder-o","folder-open-o","smile-o","frown-o","meh-o","gamepad","keyboard-o","flag-o","flag-checkered","terminal","code","mail-reply-all","reply-all","star-half-empty","star-half-full","star-half-o","location-arrow","crop","code-fork","unlink","chain-broken","question","info","exclamation","superscript","subscript","eraser","puzzle-piece","microphone","microphone-slash","shield","calendar-o","fire-extinguisher","rocket","maxcdn","chevron-circle-left","chevron-circle-right","chevron-circle-up","chevron-circle-down","html5","css3","anchor","unlock-alt","bullseye","ellipsis-h","ellipsis-v","rss-square","play-circle","ticket","minus-square","minus-square-o","level-up","level-down","check-square","pencil-square","external-link-square","share-square","compass","toggle-down","caret-square-o-down","toggle-up","caret-square-o-up","toggle-right","caret-square-o-right","euro","eur","gbp","dollar","usd","rupee","inr","cny","rmb","yen","jpy","ruble","rouble","rub","won","krw","bitcoin","btc","file","file-text","sort-alpha-asc","sort-alpha-desc","sort-amount-asc","sort-amount-desc","sort-numeric-asc","sort-numeric-desc","thumbs-up","thumbs-down","youtube-square","youtube","xing","xing-square","youtube-play","dropbox","stack-overflow","instagram","flickr","adn","bitbucket","bitbucket-square","tumblr","tumblr-square","long-arrow-down","long-arrow-up","long-arrow-left","long-arrow-right","apple","windows","android","linux","dribbble","skype","foursquare","trello","female","male","gittip","gratipay","sun-o","moon-o","archive","bug","vk","weibo","renren","pagelines","stack-exchange","arrow-circle-o-right","arrow-circle-o-left","toggle-left","caret-square-o-left","dot-circle-o","wheelchair","vimeo-square","turkish-lira","try","plus-square-o","space-shuttle","slack","envelope-square","wordpress","openid","institution","bank","university","mortar-board","graduation-cap","yahoo","google","reddit","reddit-square","stumbleupon-circle","stumbleupon","delicious","digg","pied-piper-pp","pied-piper-alt","drupal","joomla","language","fax","building","child","paw","spoon","cube","cubes","behance","behance-square","steam","steam-square","recycle","automobile","car","cab","taxi","tree","spotify","deviantart","soundcloud","database","file-pdf-o","file-word-o","file-excel-o","file-powerpoint-o","file-photo-o","file-picture-o","file-image-o","file-zip-o","file-archive-o","file-sound-o","file-audio-o","file-movie-o","file-video-o","file-code-o","vine","codepen","jsfiddle","life-bouy","life-buoy","life-saver","support","life-ring","circle-o-notch","ra","resistance","rebel","ge","empire","git-square","git","y-combinator-square","yc-square","hacker-news","tencent-weibo","qq","wechat","weixin","send","paper-plane","send-o","paper-plane-o","history","circle-thin","header","paragraph","sliders","share-alt","share-alt-square","bomb","soccer-ball-o","futbol-o","tty","binoculars","plug","slideshare","twitch","yelp","newspaper-o","wifi","calculator","paypal","google-wallet","cc-visa","cc-mastercard","cc-discover","cc-amex","cc-paypal","cc-stripe","bell-slash","bell-slash-o","trash","copyright","at","eyedropper","paint-brush","birthday-cake","area-chart","pie-chart","line-chart","lastfm","lastfm-square","toggle-off","toggle-on","bicycle","bus","ioxhost","angellist","cc","shekel","sheqel","ils","meanpath","buysellads","connectdevelop","dashcube","forumbee","leanpub","sellsy","shirtsinbulk","simplybuilt","skyatlas","cart-plus","cart-arrow-down","diamond","ship","user-secret","motorcycle","street-view","heartbeat","venus","mars","mercury","intersex","transgender","transgender-alt","venus-double","mars-double","venus-mars","mars-stroke","mars-stroke-v","mars-stroke-h","neuter","genderless","facebook-official","pinterest-p","whatsapp","server","user-plus","user-times","hotel","bed","viacoin","train","subway","medium","yc","y-combinator","optin-monster","opencart","expeditedssl","battery-4","battery","battery-full","battery-3","battery-three-quarters","battery-2","battery-half","battery-1","battery-quarter","battery-0","battery-empty","mouse-pointer","i-cursor","object-group","object-ungroup","sticky-note","sticky-note-o","cc-jcb","cc-diners-club","clone","balance-scale","hourglass-o","hourglass-1","hourglass-start","hourglass-2","hourglass-half","hourglass-3","hourglass-end","hourglass","hand-grab-o","hand-rock-o","hand-stop-o","hand-paper-o","hand-scissors-o","hand-lizard-o","hand-spock-o","hand-pointer-o","hand-peace-o","trademark","registered","creative-commons","gg","gg-circle","tripadvisor","odnoklassniki","odnoklassniki-square","get-pocket","wikipedia-w","safari","chrome","firefox","opera","internet-explorer","tv","television","contao","500px","amazon","calendar-plus-o","calendar-minus-o","calendar-times-o","calendar-check-o","industry","map-pin","map-signs","map-o","map","commenting","commenting-o","houzz","vimeo","black-tie","fonticons","reddit-alien","edge","credit-card-alt","codiepie","modx","fort-awesome","usb","product-hunt","mixcloud","scribd","pause-circle","pause-circle-o","stop-circle","stop-circle-o","shopping-bag","shopping-basket","hashtag","bluetooth","bluetooth-b","percent","gitlab","wpbeginner","wpforms","envira","universal-access","wheelchair-alt","question-circle-o","blind","audio-description","volume-control-phone","braille","assistive-listening-systems","asl-interpreting","american-sign-language-interpreting","deafness","hard-of-hearing","deaf","glide","glide-g","signing","sign-language","low-vision","viadeo","viadeo-square","snapchat","snapchat-ghost","snapchat-square","pied-piper","first-order","yoast","themeisle","google-plus-circle","google-plus-official","fa","font-awesome","handshake-o","envelope-open","envelope-open-o","linode","address-book","address-book-o","vcard","address-card","vcard-o","address-card-o","user-circle","user-circle-o","user-o","id-badge","drivers-license","id-card","drivers-license-o","id-card-o","quora","free-code-camp","telegram","thermometer-4","thermometer","thermometer-full","thermometer-3","thermometer-three-quarters","thermometer-2","thermometer-half","thermometer-1","thermometer-quarter","thermometer-0","thermometer-empty","shower","bathtub","s15","bath","podcast","window-maximize","window-minimize","window-restore","times-rectangle","window-close","times-rectangle-o","window-close-o","bandcamp","grav","etsy","imdb","ravelry","eercast","microchip","snowflake-o","superpowers","wpexplorer","meetup"
*/
