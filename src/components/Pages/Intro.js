import React, { Component } from 'react';
import QuerySelector from '../Sections/QuerySelector';

class Into extends Component {
	render() {
	    return (
	      <div className="intro page clearfix">
	     	<h1><span className='i'>I</span>NTRODUC<span className='i'>TI</span>ON</h1>
	     	<p>There are several fine hockey websites, all worthy in their own way, but I believe there is space for nhlplayers.ca to complement what is already available.</p>
			<p>The goal of this website is as simple to state as it is difficult to execute—to produce and develop a space devoted to every NHL player who has stepped on the ice during a regular season or playoff game. There are many ramifications to this ambition, and as of launch date these are only partially realized.</p>
			<p>Indeed, just documenting the names of the players is difficult—formal vs. diminutive names; given name and nickname; spelling of non-Latin names; accounting for spelling that has changed with time; players who themselves have legally changed their names from birth to adulthood. </p>
			<p>Dates of birth, too, are often open to debate, and I believe no date of death can be considered fully accurate until proof of both place and date of death can be ascertained.</p>
			<p>First things first, though. Readers will notice that the player register isn’t broken up in any way. Skaters and goaltenders are listed together, and all players from A to Z are listed in one file and not separated by alphabet. This is absolutely vital because it means you can filter and sort and search and acquire all results from A to Z in one fell swoop.</p>
			<p>If you want to know how many players retired because of head injuries, go to Career Summary and sort alphabetically, scroll down to “h” and you’ll see the (long) list of names. Want to know how many players died of cancer? Sort Cause of Death, go to the letter “c” and your list is clear.</p>
			<p>The history of the game is ongoing, and so is the acquisition of information of players, and so, by extension, is the development of this website. In short, this is a work in progress, but consider this current incarnation as Phase One. It aims first and last to be accurate. Names are given as both what a player is commonly referred to as well as what is the full name.</p>
			<p>You will notice for birth information there are more than one hundred scans of a player’s birth notice from a newspaper. This is information not available anywhere else, and no one else has tried to archive this information. It is highly relevant, though, as it confirms a date and place of birth as well as a full name. I will add to this section on an ongoing basis.</p>
			<p>Death information is essential, and accuracy is the guiding force. When all is said and done, there will be proof of date and place of death for every deceased NHLer. The scans included are from my own archives over the years and comprise not just newspaper announcements but in some cases death certificates, news stories, or other documented proof of a player’s place and date of death</p>
			<p>Additionally, it’s vital to learn what players did with their lives after they retired, and cause of death is also important information to bring coherence to the cradle-to-grave research. </p>
			<p>As well, there is a quick summary of every player’s career and wherever possible a note about how it came to be that his NHL career (or, more generally, hockey career) came to an end (as every one must).</p>
			<p>The final section of Phase One includes the statistics of every player’s first game. For skaters, that means goals, assists, points, penalties; for goalies, minutes and seconds played, goals allowed, assists, penalties, and, of course, decision (won-loss-tie—no decision). </p>
			<p>The search and filter functions are amazing tools that visitors can use to glean all sorts of information, and so the best way to enjoy the site is to get digging and scrolling through the nearly 7,600 lines and thousands of pieces of information.</p>
			<p>The site will be updated frequently for players already on the site. For new players to the NHL every season, a major update will take place every July. This site will not attempt to track every rookie every day playing his first game, but with the information within, it will attempt to be accurate to the greatest degree possible.</p>
			<p>- Andrew Podnieks</p>
			<p className="no-padding">January 2018</p>
			<QuerySelector categories={[]}/>
	      </div>
	    );
	}
}

export default Into;
