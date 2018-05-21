import React, { Component } from 'react';
import QuerySelector from '../Sections/QuerySelector';
import { Link } from 'react-router-dom';

class Into extends Component {
	render() {
	    return (
	      <div className="intro page clearfix">
	     	<h1><span className='i'>I</span>NTRODUC<span className='i'>TI</span>ON</h1>
			<p>The goal of this website is as simple to state as it is difficult to execute—to produce and develop a space documenting the lives and careers of every player who has played in the NHL. </p>
			<p>There are several complexities to this ambition, and as of launch date this goal is only partially realized.</p>
			<p>Indeed, just listing the names of the players is tricky—full name and common name; given name and nickname; spelling of non-Latin names; accounting for spelling that has changed over time; players who themselves have legally changed their names from birth to adulthood. </p>
			<p>Places and dates of birth and death that have entered into mainstream acceptance, without relevant or textual proof, have added to the confusion. Indeed, one of the ambitions of this website is to provide written records of some sort to confirm this information for every player. </p>
			<p>First things first, though. Readers will notice that the player register isn’t broken up in any way. Skaters and goaltenders are listed together, and all players from A to Z, 1917 to the present, are listed in one large file. This is vital because it means one can filter and sort and search and acquire all results for more than 7,600 players in one fell swoop.</p>
			<p>If you want to know how many players retired because of head injuries, go to Career Summary and sort alphabetically, scroll down to “h” and you’ll see the (long) list of names (or search for “head,” for instance, and the results will appear). Want to know how many players died of cancer? Sort Cause of Death, go to the letter “c” and your list is clear. How many NHLers were born in Toronto? Search “Toronto” under Birth City to get your answer.</p>
			<p>The history of the game is ongoing, and so my ability to acquire information. As a result, I consider this website to be a living and breathing organism. It is, one might say, a perpetual work in progress. For now, consider this website in its current incarnation as Phase One.</p>
			<p>For the first time anywhere, visitors will also notice documentation for birth information, from both government sources as well as newspapers. This is information not available anywhere else, but I believe it to be important because it confirms a date and place of birth as well as (usually) a full name. I will be adding to this section with increasing energy in the coming months (Phase Two).</p>
			<p>Death information is essential, and accuracy is the guiding force. When all is said and done, <Link to='/'>www.nhlplayers.ca</Link> will provide proof of date and place of death for every deceased NHLer. The scans included on this site are from my own archives over the years and comprise not just newspaper announcements but in some cases death certificates, news stories, or other documented proof of a player’s place and date of death. As well, many people from around North America have helped. These fine people are listed in the <Link to='/thanks'>Thanks</Link> section. </p>
			<p>I believe that it is important to learn what players did with their lives after they retired, and cause of death is also important information to bring coherence to the crib-to-coffin research. </p>
			<p>As well, there is a quick summary of every player’s career and, wherever possible, a note about how that NHL career (or, more generally, hockey career) came to an end.</p>
			<p>The final section of Phase One includes statistics and notes for every player’s first game. For skaters, that means goals, assists, points, penalties; for goalies, minutes and seconds played, goals allowed, assists, penalties, and, of course, decision (won-loss-tie-no decision). </p>
			<p>The search and filter functions are amazing tools that people can use to glean all sorts of information, and so the best way to enjoy the site is to get digging and scrolling through the nearly 7,600 lines and thousands of pieces of information.</p>
			<p>As mentioned, the site will be updated frequently for players already on the site. For new players to the NHL every season, a major update will take place in each July. This site will not attempt to track every rookie every day playing his first game. That is something other websites are better equipped to handle. But once a player is in <Link to='/'>www.nhlplayers.ca</Link>, he is there forever.</p>
			<p>There are a number of excellent hockey websites, but I believe there is space for this site to make a contribution. This is an ambitious project, but I believe its purpose is important in documenting and understanding the history of hockey and the players who gave their lives to it. Enjoy!</p>
			<p>- Andrew Podnieks</p>
			<p className="no-padding">May 2018</p>
			<QuerySelector categories={[]}/>
	      </div>
	    );
	}
}

export default Into;
