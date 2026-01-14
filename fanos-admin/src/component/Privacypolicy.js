import { Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ApiConfig from "../config/APICongig";
import Axios from "axios";
import { toast } from "react-toastify";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NoDataFound from "./DataNotFound.js";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  faqBox: {
    height: "100%",
    minHeight: "50vh",
  },
  HeadingFaq: {
    color: '#0C576C',
    fontFamily: 'Poppins',
    fontSize: '16.183px',
    fontWeight: "400 !important",
   
  },
  accordianCard: {
    borderRadius: "7.794px",
    background: "#FFF",
    boxShadow: "0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)",

    "&.MuiAccordion-root": {
      backgroundColor: "#FFF",
    },
  },
  queHeading: {
    color: '#0C576C',
    fontSize: '16px',
    fontWeight: "400 !important",
  },

  ansPassage: {
    color: '#707070',
    fontSize: '14px',
    fontWeight: "400 !important",

  },
}));

const Faq = () => {
  const classes = useStyles();
  const [faqData, setFaqData] = useState([]);
  const getFaqData = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getFaq,
      });

      if (res?.data?.responseCode === 200) {
        setFaqData(res.data?.result?.docs);
      } else {
        toast.warn(res?.data?.responseMessage);
      }
    } catch (error) { }
  };
  useEffect(() => {
    getFaqData();
  }, []);

  return (
    <>
      <Box pt={1} className={classes.faqBox}>
        <Box pt={2} pb={3}>
          <Typography className={classes.HeadingFaq}>
              Privacy policy
            </Typography>
            <div>
      <h1 className={classes.HeadingFaq} variant="body1">
      privacy policy:
      
We respect and care about protecting the privacy of your personal data and complying with applicable legal provisions. Therefore, we have drafted this policy to inform you of the information collected about you and how this data is managed and used. By using any of the services of the website (www.fanos.one), this means that you agree to this policy. With all the practices it entails.
First: Definitions
In this policy, unless the context otherwise requires, the following terms have the meanings indicated. “Website” or “we” or “us”: refers to the website (www.fanos.one). “User”, “you” or “you”: means the person who visits, uses the Site or accesses any of the Services or Advertisements. “Advertiser” refers to any person who requests the Site to publish their advertisements. “User” refers to every person who visits the site for the purpose of viewing the advertisements published through it. “Advertising” means every advertisement published on the Site at the request of the advertiser, whether commercial or non-commercial. “Policy” refers to this document and its terms and conditions. “Personal data” refers to data that can be used to identify or contact an individual.
Second: The personal data we collect
We may collect and process the following data about you:
1. The data you provide to us while you register on the site, including name, country, and mobile number.
2. The data you provide to us in our electronic documents necessary for you to publish the advertisement.
3. Data you provide to us when you enter a competition or advertising promotion with us.
4. Data you provide to us when you report a problem with the site, whether related to advertising or otherwise.
5. Data you provide to us when you communicate with us or our customer service for any reason.
6. The data you provide to us during the payment process for publishing an advertisement.
Third: Cookies policy
Cookies are text files that are stored on your device when you visit some web pages. These files will not harm your device. They are used as follows:
1. Cookies are used for the purpose of providing information, such as identifying errors on the site and fixing them.
2. Cookies are used to remember the main and sub-pages that you have visited on our website.
3. Cookies are used to always improve your experience with us, and to improve our services and activities provided to you.
4. There are cookies for pages published on our site that are not affiliated with us, such as the video content of YouTube.com, and you know and agree that we do not control the cookies of such sites and you must enter these sites and review the policies they follow, and then modify the cookie settings. .
5. You can change your cookie preferences by accessing your device or browser settings and choosing what is appropriate for you.
Fourth: Limits on the use of your personal data
We are always committed to protecting your privacy, and therefore we use your personal data for the following purposes:
1. To enable you to use the site and enjoy our services optimally, to always provide you with the best, and to provide advertisements without encountering any problems.
2. To create your account or profile through which you communicate with us through the site.
3. To provide you with everything new about the advertisements that are published through the site.
4. For internal business purposes such as improving our services, and personalizing the content, recommendations and advertising we provide to you through the Site.
5. To process the data you provide to us and ensure that it is correct and that you are the owner of it, such as ensuring that your email address or mobile phone number is valid.
6. To communicate with you regarding problems or inquiries you submit to us through the designated communication channels, which you need to solve or answer.
7. For the purposes disclosed at the time you provide your information, with your consent, and in accordance with this Privacy Policy.

Fifth: Disclosure of your personal data
We pledge not to disclose or share your data with any other parties without your consent. However, you know and agree that we disclose your data in the following cases:
1. Display your phone number on the ad page for easy contact with you.
2. To our employees and all our employees or affiliates for the purpose of providing services to you.
3. If we are required to disclose data under applicable laws, and within the limits of what these laws require us to do.
4. In the event that a judicial ruling or decision is issued by the competent judicial authorities obligating us to do so, or in the event of a decision being issued by the public authorities obligating us to do so.
5. In all cases, you know and agree that the Internet is not a secure means, and that the confidentiality of your personal information cannot be completely guaranteed, and therefore you exempt us from any liability arising from hacking the site for involuntary reasons, despite our taking reasonable security steps, and resulting in a violation. For privacy of personal data.
Sixth: User obligations
1. Both the advertiser and the user are committed to maintaining the confidentiality and privacy of their personal data, and acknowledge, on their own responsibility, that any of them’s disclosure of personal information to the other party will be at their responsibility without any interference from us, and without any responsibility on us.
2. The advertiser and the user are obligated not to disclose any personal information through the advertisement pages, and they are personally responsible for any disclosure of this kind.
3. The advertiser and the user undertake to maintain the secrets of the site, and each of them will be held accountable to us for any breach of the confidentiality of the site and its operations.
4. The advertiser and the user are obligated to refrain from disclosing any information related to the operation of the site to others, whether in return or without compensation.
5. The advertiser and the user are obligated to maintain the confidentiality of all information related to the details of transactions through the site, and not to use it in any way, and are contractually and legally responsible for any illegal or unauthorized use of this information.
6. You acknowledge to avoid following any means that would help collect information about other users, including their e-mail, mobile numbers, and other means of communication.
Seventh: Amendments
1. You understand and agree that we may modify the Privacy Policy at any time.
2. If we modify this policy, we will publish a notice on the site, and you are assumed to be aware of these modifications as soon as the notice is published on the site.
3. Your continued use of the site after modifications to this policy means that you agree to the modifications and updates we have made.

      </h1>
    </div>
        </Box>

        {faqData.length === 1 ? (
          <>
            <NoDataFound />
          </>
        ) : (
          <> {null}</>
        )}

        <Grid container spacing={2} style={{ marginBottom: '40px' }}>
          {faqData &&
            faqData.map((value, index) => {
              return (
                <>
                  <Grid item xs={6} key={index}>
                    <Accordion className={classes.accordianCard}>
                      <AccordionSummary
                        expandIcon={
                          <ExpandMoreIcon style={{ color: "#D39B2D" }} />
                        }
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography className={classes.queHeading}>
                          {value?.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography className={classes.ansPassage}>
                          {value?.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </>
              );
            })}
        </Grid>
      </Box>
    </>
  );
};
export default Faq;
