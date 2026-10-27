const {
	ClassicEditor,
	Essentials,
	Bold,
	Italic,
	Font,
	Paragraph,
	List,
	TodoList
} = CKEDITOR;

const editorConfig = {
	attachTo: document.querySelector('#editor'),
	root: {
		placeholder: 'Type or paste your content here!',
	},
	toolbar: {
		items: ['bulletedList'],
		shouldNotGroupWhenFull: false
	},
	plugins: [Essentials, List, Paragraph],
	licenseKey: 'GPL',
};

ClassicEditor.create(editorConfig);
