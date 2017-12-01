import React from 'react'
import withRoot from '../components/withRoot'
import withDrawer from '../components/withDrawer'
import MenuAppBar from '../components/menuAppBar'
import { Link } from 'react-router-dom'
import PaperSheet from '../components/paperSheet'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import Gavel from 'material-ui-icons/Gavel'
import Help from 'material-ui-icons/Help'
import Favorite from 'material-ui-icons/Favorite'
import Avatar from 'material-ui/Avatar'
import { CardHeader } from 'material-ui/Card'

const legalText = [
  {
    text: (
      <CardHeader
        style={{ paddingTop: 4, paddingBottom: 16 }}
        avatar={
          <Avatar>
            <Gavel />
          </Avatar>
        }
        title="Terms of Use"
      />
    ),
    style: 'paragraph',
    bottomMargin: false
  },
  {
    text: `Welcome, and thank you for your interest in Noti-fly, Inc. ("Noti-fly") The following Terms of Use are a legally binding contract between you and Noti-fly regarding your use of Noti-fly's website, mobile applications, networks, and other related features or services (collectively, the "Service").`,
    style: 'paragraph',
    bottomMargin: true
  },
  {
    text: `PLEASE READ THE FOLLOWING TERMS OF USE CAREFULLY. BY CLICKING "I ACCEPT," REGISTERING FOR AN ACCOUNT, DOWNLOADING A NOTI-FLY MOBILE APPLICATION, ACCESSING, BROWSING, OR OTHERWISE USING THE SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THE FOLLOWING TERMS AND CONDITIONS, INCLUDING THE NOTI-FLY PRIVACY POLICY, ANY APPLICABLE END USER LICENSE AGREEMENT, AND ANY ADDITIONAL TERMS OR FUTURE MODIFICATIONS (COLLECTIVELY, THE "TERMS").`,
    style: 'paragraph',
    bottomMargin: true
  },
  {
    text: `
Eligibility. You must be at least thirteen (13) years old to use the Service. By agreeing to the Terms, you represent and warrant to us: (i) that you are at least thirteen (13) years old (ii) that you have not previously been suspended, removed or deactivated from the Service and (iii) that your registration and your use of the Service is in compliance with any and all applicable laws and regulations. If you are using the Service on behalf of an entity, organization, or company (collectively "Subscribing Organization"), you are an authorized representative of that Subscribing Organization with the authority to bind such organization to these Terms; and agree to be bound by these Terms on behalf of such Subscribing Organization. In such a case, "you" in these Terms refers to your Subscribing Organization, and any individual authorized to use the Service on behalf of the Subscribing Organization, including you.
Privacy Policy; End User License Agreement; Additional Terms
Privacy Policy. Please read the Noti-fly Privacy Policy carefully for information relating to our collection, use, and disclosure of your personal information. The Noti-fly Privacy Policy is hereby incorporated by reference into, and made a part of, these Terms.
End User License Agreement. Your use of any mobile application or other downloadable software we may provide (each, an "App") is subject to an End User License Agreement. The applicable End User License Agreement depends on the platform on which the App is designed to run and the features of the App. The End User License Agreement will be presented to you when you download and/or install the App and will be accessible through the App. Apps are deemed part of the Service, and all such End User License Agreements are hereby incorporated into, and made a part of, the Terms by reference.
Additional Terms. Your use of the Service is subject to any additional terms, rules, or guidelines applicable to certain services and features which we may post from time to time (the "Additional Terms"). All such Additional Terms are hereby incorporated by reference into, and made a part of, the Terms.
Modification of the Terms. We reserve the right, at our discretion, to change the Terms on a going forward basis at any time. Please check the Terms periodically for changes. Your continued use of the Service after the changes become effective constitutes your binding acceptance of such changes. In the event that a change to the Terms materially modifies your rights or obligations, we will make an effort to notify you of the change, such as by sending you an email to the address we have on file for you, or presenting a pop-up window or other notification to you through the Service when you log in. Immaterial modifications are effective upon publication, and material changes will be effective upon the earlier of (a) continued use of the Service with actual knowledge of the modification, or (b) thirty (30) days following the change. For the avoidance of doubt, disputes arising hereunder will be resolved in accordance with the Terms in effect that the time the dispute arose.
Accounts and Registration. To access most features of the Service you must register for an account. When you register for an account, you may be required to provide us with some information about yourself (such as your e-mail address or other contact information). You agree that the information you provide to us is and will be accurate and up-to-date at all times. When you register, you will be asked to provide a password. You are solely responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. If you have reason to believe that your account is no longer secure for any reason (for example, in the event of a loss, theft or unauthorized disclosure or use of your password), then you agree to notify us immediately by submitting a ticket from within the app or visiting our Help Center. If you are unable to log-in to the Help Center please send an email to accountsupport@Noti-fly.com.
User Rewards.
User Rewards Generally. Noti-fly makes available through the Service offers on certain third-party products and services (each an "Offer"). When you redeem an Offer through the Service, you will accumulate rewards in your Noti-fly account ("Rewards"). Each Offer may be subject to Additional Terms and may be discontinued by Noti-fly at any time. At any time and in Noti-fly's sole discretion, Noti-fly may: (i) determine whether or not you are eligible to redeem an Offer; (ii) determine whether or not you have earned Rewards; or (iii) adjust your Rewards total. Prior to distribution, Rewards have no monetary value and you may not obtain any cash, money, or anything of value in exchange for your Rewards total except as made available by Noti-fly under Section 5.2. `,
    style: 'paragraph',
    bottomMargin: false
  }
]

const Legal = props => {
  return (
    <div>
      <MenuAppBar title="Legal" />
      <div className="container">
        <PaperSheet data={legalText} />
        <Link to="/about" style={{ textDecoration: 'none' }}>
          <Button raised color="primary" style={{ marginTop: 16 }}>
            <Help style={{ marginRight: 7, height: 16, width: 16 }} />
            About
          </Button>
        </Link>
        <Link to="/home" style={{ textDecoration: 'none' }}>
          <Button
            raised
            color="primary"
            style={{ marginTop: 16, marginLeft: 15 }}
          >
            <Favorite style={{ marginRight: 7, height: 16, width: 16 }} />
            Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

const connector = connect(
  state => state,
  dispatch => {
    return {
      toggleDrawer: () => dispatch({ type: 'TOGGLE_DRAWER' })
    }
  }
)

export default withRoot(withDrawer(connector(Legal)))
