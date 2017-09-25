import React, { Component } from 'react';
import TwitterSVG from '../../assets/svg_twitter.js';
import MailSVG from '../../assets/svg_mailto.js';


class Footer extends Component {
	render(){
		return(
			<footer>
				<section className="externalLink">
					<a href="http://andrewpodnieks.com">
						andrewpodnieks<span className="reg"> . </span>com
					</a>
				</section>
				<section className="socialFooter">
					<TwitterSVG link="https://twitter.com/andrewpodnieks" />
					<MailSVG link="mailto:andrewpodneiks@gmail.com"/>
				</section>
			</footer>
		);
	}
}

export default Footer;