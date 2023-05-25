import { useState } from 'react';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Link } from '../../components/Link';
import { FontWeightEnum, Text, TextSizeEnum } from '../../components/Text';

import { PagesEnum } from '../../routing/PagesEnum';

import styles from './Login.module.scss';

export const Login = () => {
  const [password, setPassword] = useState('');

  return (
    <div className={styles.container}>
      <img src="images/logo_white.png" alt="logo" className={styles.logo} />
      <Text size={TextSizeEnum.S32} fontWeight={FontWeightEnum.FW700}>
        DeTrust
      </Text>
      <Text
        size={TextSizeEnum.S16}
        fontWeight={FontWeightEnum.FW500}
        className={styles.subheading}
      >
        Make smarter decisions
      </Text>
      <Input
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id={'password'}
        className={styles.input}
      />
      <Button text="Unlock" className={styles.unlockButton} />
      <Text size={TextSizeEnum.S12} className={styles.forgotPassword}>
        <Link to={PagesEnum.login}>Forgot password?</Link>
      </Text>
      <Text size={TextSizeEnum.S12}>
        Need help? Contact <Link to={PagesEnum.login}>DeTrust support</Link>
      </Text>
    </div>
  );
};