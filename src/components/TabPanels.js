/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import SimpleForm from './forms/SimpleForm';
import RandomsForm from './forms/RandomsForm';
import DatesForm from './forms/DatesForm';
import {Trans, withTranslation} from 'react-i18next';
import {isNumeric, makeRequest} from './Utils';
import {
  Grid,
  Tabs,
  Tab,
  Typography,
} from '@material-ui/core';

function TabPanel(props) {
  return (
    <Grid item>
      {props.children}
    </Grid>
  );
}

export default withTranslation()(class TabPanels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      number: null,
      error: false,
      errMsg: '',
      value: 0,
    };

    this.instance = axios.create({
      baseURL: 'http://numbersapi.com',
    });

    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.reset = this.reset.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  reset() {
    this.setState({
      text: '',
      number: '',
    });
  }

  handleChange(event, value) {
    this.setState({
      value: value,
      text: '',
      number: '',
    });
  }

  handleChangeNumber(number) {
    this.setState({number: number});
  }

  handleTextChange(text) {
    this.setState({text: text});
  }

  handleError(error, errMsg) {
    this.setState({
      error: error,
      errMsg: errMsg,
    });
  }

  handleClick(number, category) {
    if (!isNumeric(number)) {
      this.setState({
        error: true,
        errMsg: 'Must be a number!',
      });
    } else {
      let url;

      switch (category) {
        case 'math':
          url = `/${number}/math?json`;
          break;
        default:
          url = `/${number}?json`;
          break;
      }

      const data = makeRequest(this.instance, url);

      data.then((data) => {
        this.setState({
          text: data.data.text,
          error: false,
          errMsg: '',
        });
      });
    }
  }

  render() {
    const {value, number, text, error, errMsg} = this.state;
    const {t} = this.props;
    return (
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Trans>
            <Tabs centered style={{flexGrow: 1}}
              value={value}
              onChange={this.handleChange}>
              <Tab label={t('math')} />
              <Tab label={t('random')}/>
              <Tab label={t('trivia')}/>
              <Tab label={t('dates')}/>
            </Tabs>
          </Trans>
        </Grid>
        <Grid item>
          {value === 0 &&
        <TabPanel>
          <SimpleForm
            number={number}
            handleChange={this.handleChangeNumber}
            handleClick={this.handleClick}
            category={'math'}
            text={text}
          >
            <Typography variant="h6">{text}</Typography>
            {error &&
              <Typography color="error">
                {t('errMsg')}
              </Typography>
            }
          </SimpleForm>
        </TabPanel>
          }
          {value === 1 &&
          <TabPanel>
            <RandomsForm
              instance={this.instance}
              handleTextChange={this.handleTextChange}
              text={text}
            >
              <Typography variant="h6">{text}</Typography>
            </RandomsForm>
          </TabPanel>
          }
          {value === 2 &&
          <TabPanel>
            <SimpleForm
              number={number}
              handleChange={this.handleChangeNumber}
              handleClick={this.handleClick}
              category={'trivia'}
              text={text}
            >
              <Typography variant="h6">{text}</Typography>
              {error &&
              <Typography color="error">
                {errMsg}
              </Typography>
              }
            </SimpleForm>
          </TabPanel>}
          {value === 3 &&
          <TabPanel>
            <DatesForm
              instance={this.instance}
              handleTextChange={this.handleTextChange}
              handleError={this.handleError}
              text={text}
            >
              <Typography variant="h6">{text}</Typography>
              {error &&
              <Typography color="error">
                {errMsg}
              </Typography>
              }
            </DatesForm>
          </TabPanel>}
        </Grid>
      </Grid>
    );
  }
});
