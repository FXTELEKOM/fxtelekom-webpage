document.addEventListener('DOMContentLoaded', function() {
    const cursors = [
        {
            ani: "https://cur.cursors-4u.net/toons/too-4/too354.ani",
            png: "https://cur.cursors-4u.net/toons/too-4/too354.png"
        },
        {
            ani: "https://cur.cursors-4u.net/cursors/cur-3/cur204.ani",
            png: "https://cur.cursors-4u.net/cursors/cur-3/cur204.png"
        },
        {
            ani: "https://cur.cursors-4u.net/nature/nat-10/nat977.ani",
            png: "https://cur.cursors-4u.net/nature/nat-10/nat977.gif"
        },
        {
            ani: "https://ani.cursors-4u.net/toons/too-12/too1133.cur"
        },
        {
            ani: "https://ani.cursors-4u.net/nature/nat-11/nat1059.cur"
        },
        {
            ani: "https://cur.cursors-4u.net/cursors/cur-9/cur805.ani",
            png: "https://cur.cursors-4u.net/cursors/cur-9/cur805.png"
        },
        {
            ani: "https://cur.cursors-4u.net/toons/too-5/too403.cur"
        }
    ];
    
    const randomIndex = Math.floor(Math.random() * cursors.length);
    const selectedCursor = cursors[randomIndex];
    
    const style = document.createElement('style');
    style.textContent = `
        * {
            cursor: url(${selectedCursor.ani}), url(${selectedCursor.png}), auto !important;
        }
    `;
    
    document.head.appendChild(style);
});