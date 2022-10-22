---
title: Layout
url: ./layout/
---

# Layout

Mechanisms of creating layouts.

[[toc]]


## Centering

An element with class <dfn>`.center`</dfn> centers a single child element using `display: grid; place-items: center`{.lang-css}.

<dfn>`.text-align:center`</dfn> center-aligns text.


## Text Columns

The <dfn>`.textcolumns`</dfn> class creates multi-column text using the CSS
[`column-width`][] property. The column width can be set with the `.colwidth-*`
classes.

[`column-width`]: https://developer.mozilla.org/en-US/docs/Web/CSS/column-width


## Flow gap

The <dfn>`.flow-gap`</dfn> class adds vertical margins between its children.


## Full Bleed

Add the <dfn>`.fullbleed`</dfn> class to make an element go outside its
container and span the whole width of the viewport.


## Layout utilities

Add some padding with <dfn>`.padding`</dfn>, or a margin with
<dfn>`.margin`</dfn>.

Add padding or margin in specific axes with <dfn>`.margin-block`</dfn>,
<dfn>`.margin-inline`</dfn>, <dfn>`.padding-block`</dfn> and
<dfn>`.padding-inline`</dfn>.

Make an element full-width with the <dfn>`.width:100%</dfn> class.


## Scrolling

Set the `overflow` property with these utility classes:

<dfn>`.overflow:auto`</dfn>  
:   Show scrollbars if needed

<dfn>`.overflow:scroll`</dfn>
:   Always show scrollbars   


## Pseudo-tables

The <dfn>`.table`</dfn> class makes an element act like a table for the purposes of layout. The <dfn>`.row`</dfn> class can be used to create a table row, or you can make all descendants of an element into rows with <dfn>`.rows`</dfn>.

  <figure><figcaption>A form with aligned labels and inputs.</figcaption>

  ~~~ html
  <form class="table rows">
    <p>
        <label for=name>Name</label>
        <input type=text id=name name=name>
    </p>
    <p>
        <label for=adr>Address</label>
        <input type=text id=adr name=adr>
    </p>
  </form>
  ~~~

  </figure>


## Positioning

<dfn>`.block`</dfn>
:   Set `display: block`.

<dfn>`.inline`</dfn>
:   Set `display: inline`.

<dfn>`.contents`</dfn>
:   Set `display: contents`.

<dfn>`.fixed`</dfn>
:   Set `position: fixed`.

<dfn>`.sticky`</dfn>
:   Set `position: sticky`.

<dfn>`.top`</dfn>
:   Set `top: 0`. Use together with `.fixed` or `.sticky`.

<dfn>`.right`</dfn>
:   Set `right: 0`. See `.top`.

<dfn>`.bottom`</dfn>
:   Set `bottom: 0`. See `.top`.

<dfn>`.left`</dfn>
:   Set `left: 0`. See `.top`.

<dfn>`.float:left`</dfn>
:   Set `float: left`.

<dfn>`.float:right`</dfn>
:   Set `float: right`.
