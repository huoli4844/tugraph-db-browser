import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { history } from 'umi';
import { useCallback, useEffect } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';
import { PUBLIC_PERFIX_CLASS } from '../constant';
import { useAuth } from '../hooks/useAuth';
import { getLocalData, setLocalData } from '../utils/localStorage';
import particlesOptions from './particles-config';
import DEFAULT_STYLE_CONFIG from '@/constants/DEFAULT_STYLE_CONFIG';

import styles from './index.module.less';
import { HOLD_TIME } from '../utils/request';
import {JSEncrypt} from 'jsencrypt'

const getUserData = () => {
  /** 解密 */
  const privateKey  = '-----BEGIN PRIVATE KEY-----\n'+
  'MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEAyv+KXPS8slWRHj8U\n'+
  'lsILdGQ/X6PPm2m0zqmXDIJyyg+yKI8DcVYULdRcT1fAgOTaq4pzXNkrr8zZGSdR\n'+
  '0MkhHwIDAQABAkAMfGFHTGpa0baGVLzwdOj9dLkNKec4GO1dFMNMqq1izi5IVxr9\n'+
  '44XDaxWEncH3YZx0U3xcxs71rmITl/yxxndhAiEA7FwvyD3nT968ooglYqfG2wfr\n'+
  'eWfJ+PH0JHY3Ulht+U8CIQDb3a9bZlVSgbfVO4aKfDtpw8J/PlYnNzAr15TYjhDH\n'+
  'MQIhAOqu3gLE9FepoUMAS56ZWClCw9vX4gL8up05g9SPWSKhAiBrXIr+dLABQ/qC\n'+
  'kziVcyiH8uGMxOHI8HgDUJgMTwL+YQIhANL3Z/z3FKPYjHR9Rq6gLUnfcsy33zc5\n'+
  'C9M/hRPFjiaT\n'+
  '-----END PRIVATE KEY-----';
  const decrypt = new JSEncrypt();
  decrypt.setPrivateKey(privateKey);
  let query: any =window.location.href?.split("?")[1] || "";
  if(query) {
    let queryObj: any = {};
    let queryList: any = query.split('&');
    queryList.forEach((item: any) => {
      let q: any = item.split('=');
      queryObj[q[0]] = decrypt.decrypt(q[1])
    })
    return queryObj
  }
}

const { Item, useForm } = Form;

export const Login = () => {
  const [form] = useForm();
  const { onLogin, loginLoading } = useAuth();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const login = async (formData?:any) => {
    const values = formData || await form.validateFields();
    setLocalData('TUGRAPH_PRE_USER', values?.userName);
    if (values) {
      try {
        onLogin(values).then(res => {
          if (res.errorCode == 200) {
            setLocalData('TUGRAPH_USER_NAME', values.userName);
            setLocalData('TUGRAPH_TOKEN', res.data.authorization);
            message.success('登录成功！', HOLD_TIME);
            if (res?.data?.default_password) {
              window.open(window.location.origin + '/reset', '_self');
            } else {
              // 登录成功以后，设置默认的样式到 localstorage 中
              const customStyleConfig = JSON.parse(
                (localStorage.getItem('CUSTOM_STYLE_CONFIG') as string) || '{}',
              );
              const styleConfig = {
                ...DEFAULT_STYLE_CONFIG,
                ...customStyleConfig,
              };
              localStorage.setItem(
                'CUSTOM_STYLE_CONFIG',
                JSON.stringify(styleConfig),
              );
              // 登录成功后跳转到首页
              window.open(window.location.origin + '/home', '_self');
            }
          } else {
            message.error('登录失败！' + res.errorMessage, HOLD_TIME);
          }
        });
      } catch (error: any) {
        message.error(error ? error : '登录失败！');
      }
    }
  };

  useEffect(() => {
    localStorage.removeItem('TUGRAPH_TOKEN')
    if (localStorage.getItem('TUGRAPH_TOKEN')) {
      // 已经登录过，则跳转到首页
      history.push('/home');
      return;
    }else{
      let query: any = getUserData();
      if(query && query.userName && query.password) {
        login(query)
      }
    }
    const preUser = getLocalData('TUGRAPH_PRE_USER') || '';
    if (preUser && form && typeof preUser === 'string') {
      form.setFieldValue('userName', preUser);
    }
  }, []);
  return;
  return (
    <div className={styles[`${PUBLIC_PERFIX_CLASS}-login-container`]}>
      {/*<img*/}
      {/*  src="https://mdn.alipayobjects.com/huamei_qcdryc/afts/img/A*AbamQ5lxv0IAAAAAAAAAAAAADgOBAQ/original"*/}
      {/*  alt="tugrap-logo"*/}
      {/*  className={styles[`${PUBLIC_PERFIX_CLASS}-logo-img`]}*/}
      {/*/>*/}
      <div className={styles[`${PUBLIC_PERFIX_CLASS}-login-container-left`]}>
        <div className={styles[`${PUBLIC_PERFIX_CLASS}-particles-container`]}>
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions}
          />
          <div className={styles[`${PUBLIC_PERFIX_CLASS}-text`]}>
            {/*<img*/}
            {/*  src="https://mdn.alipayobjects.com/huamei_qcdryc/afts/img/A*ASz1S5q2zRYAAAAAAAAAAAAADgOBAQ/original"*/}
            {/*  alt="tugraph-slogan"*/}
            {/*></img>*/}
          </div>
        </div>
      </div>

      <div className={styles[`${PUBLIC_PERFIX_CLASS}-login-form`]}>
        <div className={styles[`${PUBLIC_PERFIX_CLASS}-logo`]}>
          <div className={styles[`${PUBLIC_PERFIX_CLASS}-account-login`]}>
            欢迎登录
          </div>
          <div className={styles[`${PUBLIC_PERFIX_CLASS}-login-desc`]}>
            请使用账号密码登录
          </div>
          <Form
            form={form}
            className={styles[`${PUBLIC_PERFIX_CLASS}-form-style`]}
          >
            <Item
              name="userName"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            >
              <Input placeholder="账号" />
            </Item>
            <Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            >
              <Input.Password
                placeholder="密码"
                iconRender={visible =>
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
              />
            </Item>
            <Button
              type="primary"
              loading={loginLoading}
              onClick={() => login()}
            >
              登录
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
