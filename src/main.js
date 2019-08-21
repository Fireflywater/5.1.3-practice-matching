import { Field } from './gameElem';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

var curField = new Field();

$(document).ready(function() {
	$('#startGameForm').submit(function(event) {
		event.preventDefault();
		curField.assembleDeck(parseInt($("#inputPairs").val()));
		curField.refresh();
	});
});