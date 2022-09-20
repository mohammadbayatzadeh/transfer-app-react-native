import * as React from 'react';
import {Text, View, ScrollView} from 'react-native';

//components
import Back from '../../components/buttons/Back';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {moderateScale, width} from '../../styles/scale';

const Terms = ({navigation}) => {
  return (
    <View style={{...styles.container, backgroundColor: '#fff'}}>
      <View style={styles.content}>
        <View style={styles.QRHeader}>
          <Back navigation={navigation} />
          <Text style={{...TextStyles.headerText, color: 'black'}}>
            Terms and Conditions
          </Text>
          <View style={{width: width / 10}}></View>
        </View>
        <ScrollView>
          <Text style={TextStyles.cancel}>
            VINO GLOBAL LIMITED operates in conjunction with its affiliates
            (hereinafter jointly referred to as the “Company” or “CoinEx”) the
            website www.coinex.com (hereinafter referred to as “Site”) and
            related mobile applications (hereinafter referred to as the
            “Platforms” which expression, for the avoidance of doubt, shall
            include the “Site”) to provide users digital assets-only transaction
            and related services. For the purpose of these Terms, affiliate
            means another entity that directly, or indirectly through one or
            more intermediaries, controls or is controlled by or is under common
            control with VINO GLOBAL LIMITED. By completing the registration as
            a user of our Platforms, you agree with and accept these Terms of
            Service (hereinafter referred to as the “Terms”) and all policies
            published on this website. IF YOU DO NOT ACCEPT THESE TERMS OF USE,
            DO NOT ACCESS THIS SITE AND DO NOT USE ANY OF COINEX’S SERVICES,
            PRODUCTS AND CONTENT.
          </Text>
          <Text
            style={{
              ...TextStyles.thinText,
              color: '#1DAB87',
              paddingVertical: moderateScale(10),
            }}>
            1. Acceptance of
          </Text>
          <Text style={TextStyles.cancel}>
            Terms 1.1 You are at least 18 years of age and have the full
            capacity to accept these Terms and enter into a transaction
            involving digital assets. You are not deprived the right to use our
            service and have the full capacity for legal action. If you do not
            meet the above condition, please do not register at our Platforms,
            otherwise the Company may suspend or terminate your account at any
            time. 1.2 Your entering into and performing these Terms are not
            prohibited by the laws and regulations of the country or region to
            which you belong, reside, pay tax or carry out business activities
            or other business. If you do not meet the above conditions, you
            should immediately terminate the registration or stop using our
            Platforms’ services.
          </Text>
          <Text
            style={{
              ...TextStyles.thinText,
              color: '#1DAB87',
              paddingVertical: moderateScale(10),
            }}>
            1. Acceptance of
          </Text>
          <Text style={TextStyles.cancel}>
            Terms 1.1 You are at least 18 years of age and have the full
            capacity to accept these Terms and enter into a transaction
            involving digital assets. You are not deprived the right to use our
            service and have the full capacity for legal action. If you do not
            meet the above condition, please do not register at our Platforms,
            otherwise the Company may suspend or terminate your account at any
            time. 1.2 Your entering into and performing these Terms are not
            prohibited by the laws and regulations of the country or region to
            which you belong, reside, pay tax or carry out business activities
            or other business. If you do not meet the above conditions, you
            should immediately terminate the registration or stop using our
            Platforms’ services.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default Terms;
