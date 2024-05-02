document.addEventListener('DOMContentLoaded', function() {

	// Color palette
	const green = 'rgb(129, 182, 34)';
	const brown = 'rgb(164,117,81)';
	const gray = 'rgb(204,204,204)';
	const blue = 'rgb(0,0,255)';

	// Function to set initial cut value for each graph
	function initialize_cut_value(value, elementId, prefix) {
        updateValue();

        function updateValue() {
            document.getElementById(elementId).textContent = value;
        }

        window[prefix + 'Cut'] = function(amt) {
            value += amt;
            updateValue();
        };
        window[prefix + 'SubCut'] = function(amt) {
            value -= amt;
            updateValue();
        };
    }
	
	// Set initial cut value for each graph
	initialize_cut_value(7, 'value', 'first');
    initialize_cut_value(10, 'value2', 'second');
	initialize_cut_value(5, 'value3', 'third');

	// Set initial cut value to graph1's value
	let currentWindow = 'first';

	// Function to keep track of what window the website is on
	// This will lead to the code setting the correct cut value
	function switchWindow(windowName) {
		currentWindow = windowName;
	}

	// Retrieves elements from html
	const guessInput = document.getElementById('guessInput');
    const enterButton = document.getElementById('enterButton');
    const resultDiv = document.getElementById('result');

	// Adds function to the guess input field enter button
	// Allowing the user to enter and check their guess
	enterButton.addEventListener('click', function() {
        // Get the value entered in the input field
        const guess = guessInput.value;

        // Check if the guess matches the value
		if (guess === (currentWindow === 'first' ? value : currentWindow === 'second' ? value2 : value3).textContent.toString()) {
            resultDiv.textContent = 'Congratulations! You guessed correctly.';
        } else {
            resultDiv.textContent = 'Sorry, your guess is incorrect. Please try again.';
        }
    });

	// Allow user to enter and check guess by pressing Enter key
    guessInput.addEventListener('keypress', function(event) {
        // Check if the key pressed is Enter
        if (event.key === 'Enter') {
            // Prevent the default behavior (form submission)
            event.preventDefault();
            // Trigger the click event of the enter button
            enterButton.click();
        }
    });

	// Adds function to each graph button
	document.getElementById('graph1Btn').addEventListener('click', () => switchGraph('cy1', 'first'));
    document.getElementById('graph2Btn').addEventListener('click', () => switchGraph('cy2', 'second'));
    document.getElementById('graph3Btn').addEventListener('click', () => switchGraph('cy3', 'third'));
	
	// Function to show correct graph in graphZone
	// Also hides all other graphs, and sets the correct cut value
	const switchGraph = (graphId, window) => {
        const graphs = document.getElementsByClassName('graph');
        for (let i = 0; i < graphs.length; i++) {
            graphs[i].style.display = 'none';
        }
        document.getElementById(graphId).style.display = 'block';
		
		switchWindow(window);
		resultDiv.textContent = "";
    };

	// Adds function to User Guide button
	document.getElementById('showGuide').addEventListener('click', () => showDropdown());

	// Shows user guide if the user guide button is clicked, hides if the button is clicked again
	const showDropdown = () => {
		if (document.getElementById("dropdown-content").style.display === 'none') {
			document.getElementById("dropdown-content").style.display = 'block';
		} else {
			document.getElementById("dropdown-content").style.display = 'none';
		}
	}

	// Sets nodes, edges, style, and layout of graph1
	var cy1 = cytoscape({
	  container: document.getElementById('cy1'), 
	  elements: [ 
		{ data: { id: 's-1', label: 's', clicked: false } }, 
		{ data: { id: 'a-1', label: 'a'} }, 
		{ data: { id: 'b-1', label: 'b' } }, 
		{ data: { id: 'c-1', label: 'c' } }, 
		{ data: { id: 'd-1', label: 'd' } }, 
		{ data: { id: 'e-1', label: 'e' } }, 
		{ data: { id: 'f-1', label: 'f' } }, 
		{ data: { id: 'g-1', label: 'g' } }, 
		{ data: { id: 't-1', label: 't' } }, 
		{ data: { id: 'sa-1', label: 3, source: 's-1', target: 'a-1' } }, // Edge connecting s to a
		{ data: { id: 'ab-1', label: 2,  source: 'a-1', target: 'b-1' } }, // Edge connecting a to b
		{ data: { id: 'sc-1', label: 1,  source: 's-1', target: 'c-1' } }, // Edge connecting s to c
		{ data: { id: 'sd-1', label: 3,  source: 's-1', target: 'd-1' } }, // Edge connecting s to d
		{ data: { id: 'de-1', label: 5,  source: 'd-1', target: 'e-1' } }, // Edge connecting d to e
		{ data: { id: 'df-1', label: 2,  source: 'd-1', target: 'f-1' } }, // Edge connecting d to f
		{ data: { id: 'et-1', label: 3,  source: 'e-1', target: 't-1' } }, // Edge connecting e to t
		{ data: { id: 'be-1', label: 4,  source: 'b-1', target: 'e-1' } }, // Edge connecting b to e
		{ data: { id: 'fc-1', label: 5,  source: 'f-1', target: 'c-1' } }, // Edge connecting f to c
		{ data: { id: 'eg-1', label: 2,  source: 'e-1', target: 'g-1' } }, // Edge connecting e to g

	  ],
	  style: [
		{
		  selector: 'node',
		  style: {
			'background-color': green,
			'label': 'data(label)', // Display node label (letter)
			'text-halign': 'center', // Center the label horizontally
        	'text-valign': 'center', // Center the label vertically
			'width': '50px',
			'height': '50px'
		  }
		},
		{
		  selector: 'edge',
		  style: {
			'width': 2, 
			'line-color': gray, 
			'curve-style': 'bezier', 
			'target-arrow-shape': 'triangle', 
			'label': 'data(label)', // Display node label (number)
		  }
		}
	  ],
	  layout: {
		name: 'grid',
		padding: 10,
		rows: 3,
		cols: 3
	  }
	});

	// Sets nodes, edges, style, and layout of graph2
	var cy2 = cytoscape({
		container: document.getElementById('cy2'), 
		elements: [ 
			{ data: { id: 's-2', label: 's' } }, 
			{ data: { id: 'a-2', label: 'a'} }, 
			{ data: { id: 'b-2', label: 'b' } }, 
			{ data: { id: 'c-2', label: 'c' } }, 
			{ data: { id: 'd-2', label: 'd' } }, 
			{ data: { id: 'e-2', label: 'e' } }, 
			{ data: { id: 'f-2', label: 'f' } }, 
			{ data: { id: 'g-2', label: 'g' } }, 
			{ data: { id: 't-2', label: 't' } }, 
			{ data: { id: 'sa-2', label: 7,  source: 's-2', target: 'a-2' } }, // Edge connecting s to a
			{ data: { id: 'ad-2', label: 6,  source: 'a-2', target: 'd-2' } }, // Edge connecting a to d
			{ data: { id: 'sc-2', label: 3,  source: 's-2', target: 'c-2' } }, // Edge connecting s to c
			{ data: { id: 'cd-2', label: 2,  source: 'c-2', target: 'd-2' } }, // Edge connecting c to d
			{ data: { id: 'de-2', label: 4,  source: 'd-2', target: 'e-2' } }, // Edge connecting d to e
			{ data: { id: 'ea-2', label: 6,  source: 'e-2', target: 'a-2' } }, // Edge connecting e to a
			{ data: { id: 'df-2', label: 7,  source: 'd-2', target: 'f-2' } }, // Edge connecting d to f
			{ data: { id: 'et-2', label: 8,  source: 'e-2', target: 't-2' } }, // Edge connecting e to t
			{ data: { id: 'be-2', label: 3,  source: 'b-2', target: 'e-2' } }, // Edge connecting b to e
			{ data: { id: 'fc-2', label: 1,  source: 'f-2', target: 'c-2' } }, // Edge connecting f to c
			{ data: { id: 'eg-2', label: 2,  source: 'e-2', target: 'g-2' } }, // Edge connecting e to g
			{ data: { id: 'ab-2', label: 4,  source: 'a-2', target: 'b-2' } }, // Edge connecting a to b
	
		  ],
		style: [
		{
			selector: 'node',
			style: {
			'background-color': green, 
			'label': 'data(label)', // Display node label (letter)
			'text-halign': 'center', // Center the label horizontally
			'text-valign': 'center', // Center the label vertically
			'width': '50px',
			'height': '50px'
			}
		},
		{
			selector: 'edge',
			style: {
			'width': 2, 
			'line-color': gray, 
			'curve-style': 'bezier', 
			'target-arrow-shape': 'triangle', 
			'label': 'data(label)', // Display node label (number)
			}
		}
		],
		layout: {
		name: 'grid',
		padding: 10,
		rows: 3,
		cols: 3
		}
	});

	// Sets nodes, edges, style, and layout of graph3
	var cy3 = cytoscape({
		container: document.getElementById('cy3'), 
		elements: [ 
			{ data: { id: 's-3', label: 's' } }, 
			{ data: { id: 'a-3', label: 'a'} }, 
			{ data: { id: 'b-3', label: 'b' } }, 
			{ data: { id: 'c-3', label: 'c' } }, 
			{ data: { id: 'd-3', label: 'd' } }, 
			{ data: { id: 'e-3', label: 'e' } }, 
			{ data: { id: 'f-3', label: 'f' } }, 
			{ data: { id: 'g-3', label: 'g' } }, 
			{ data: { id: 't-3', label: 't' } }, 
			{ data: { id: 'sa-3', label: 2,  source: 's-3', target: 'a-3' } }, // Edge connecting s to a
			{ data: { id: 'ad-3', label: 4,  source: 'a-3', target: 'd-3' } }, // Edge connecting a to d
			{ data: { id: 'sc-3', label: 3,  source: 's-3', target: 'c-3' } }, // Edge connecting s to c
			{ data: { id: 'ac-3', label: 1,  source: 'a-3', target: 'c-3' } }, // Edge connecting c to d
			{ data: { id: 'dg-3', label: 4,  source: 'd-3', target: 'g-3' } }, // Edge connecting d to g
			{ data: { id: 'ea-3', label: 5,  source: 'e-3', target: 'a-3' } }, // Edge connecting e to a
			{ data: { id: 'dt-3', label: 7,  source: 'd-3', target: 't-3' } }, // Edge connecting d to t
			{ data: { id: 'et-3', label: 9,  source: 'e-3', target: 't-3' } }, // Edge connecting e to t
			{ data: { id: 'be-3', label: 1,  source: 'b-3', target: 'e-3' } }, // Edge connecting b to e
			{ data: { id: 'fc-3', label: 4,  source: 'f-3', target: 'c-3' } }, // Edge connecting f to c
			{ data: { id: 'fd-3', label: 3,  source: 'f-3', target: 'd-3' } }, // Edge connecting f to d
			{ data: { id: 'ab-3', label: 3,  source: 'a-3', target: 'b-3' } }, // Edge connecting a to b
	
		  ],
		style: [
		{
			selector: 'node',
			style: {
			'background-color': green,
			'label': 'data(label)', // Display node label (letter)
			'text-halign': 'center', // Center the label horizontally
			'text-valign': 'center', // Center the label vertically
			'width': '50px',
			'height': '50px'
			}
		},
		{
			selector: 'edge',
			style: {
			'width': 2, // Edge width
			'line-color': gray, 
			'curve-style': 'bezier', 
			'target-arrow-shape': 'triangle', 
			'label': 'data(label)', // Display node label (number)
			}
		}
		],
		layout: {
		name: 'grid',
		padding: 10,
		rows: 3,
		cols: 3
		}
	});

	// Set all s nodes to brown
	cy1.style().selector('#s-1').style({
		'background-color': brown,
	}).update();
	cy2.style().selector('#s-2').style({
		'background-color': brown, 
	}).update();
	cy3.style().selector('#s-3').style({
		'background-color': brown, 
	}).update();

	// Set all initial edges coming out of s nodes to blue
	cy1.style().selector('edge[source="s-1"]').style({
		'line-color': blue 
	}).update();
	cy2.style().selector('edge[source="s-2"]').style({
		'line-color': blue 
	}).update();
	cy3.style().selector('edge[source="s-3"]').style({
		'line-color': blue 
	}).update();

	// Function to correctly change nodes and edges when nodes are clicked or un-clicked
	const handleNodeClick = (cy, addCutFunc, subCutFunc) => {
        cy.on('click', 'node', function(event) {
            const node = event.target;
			// Makes it so that the user is not able to change the s and t nodes
            if (node.id() === 's-1' || node.id() === 's-2' || node.id() === 's-3' || node.id() === 't-1' || node.id() === 't-2' || node.id() === 't-3') {
                return;
            }
			const nodeColor = node.style('background-color');

			let will_connect_to_s = false;

			node.incomers('edge').forEach(function(edge) {
				const sourceColor = edge.source().style('background-color');
				// Check if there exists a source node that is brown
				if (sourceColor === brown) {
					will_connect_to_s = true;
				}
			});

			// If node is green and will connect to s, change to brown
			if (nodeColor !== brown && will_connect_to_s) {
				node.style('background-color', brown);
				// If outgoing edges are gray, change to blue and add to cut value
				node.outgoers('edge').forEach(function(edge) {
					if (edge.target().style('background-color') !== brown) {
						const prevColor = edge.style('line-color');
						if (prevColor === gray) {
							edge.style('line-color', blue);
							addCutFunc(edge.data('label'));
						}
					}
				});
				// If incoming edges are blue, change to gray and subtract from cut value
				node.incomers('edge').forEach(function(edge) {
					const prevColor = edge.style('line-color');
					if (prevColor === blue) {
						edge.style('line-color', gray);
						subCutFunc(edge.data('label'));
					}
				});
			// If node is brown, change to green
			} else {
				node.style('background-color', green);
				// If incoming edges are gray, change to blue and add to cut value
				node.incomers('edge').forEach(function(edge) {
					if (edge.source().style('background-color') === brown) {
						const prevColor = edge.style('line-color');
						if (prevColor === gray) {
							edge.style('line-color', blue);
							addCutFunc(edge.data('label'));
						}
					}
				});
				// If outgoing edges are blue, change to gray and subtract from cut value
				node.outgoers('edge').forEach(function(edge) {
					const prevColor = edge.style('line-color');
					if (prevColor === blue) {
						edge.style('line-color', gray);
						subCutFunc(edge.data('label'));
					}
				});
			}
        }); 
    };

	// Add function to each graph so that nodes change correctly
	handleNodeClick(cy1, firstCut, firstSubCut);
	handleNodeClick(cy2, secondCut, secondSubCut);
	handleNodeClick(cy3, thirdCut, thirdSubCut);

	// Set initial graph to graph1
	switchGraph('cy1', 'first');
});