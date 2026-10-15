const e=`{# A <ul> with no <li> is what SiteImprove reports as "Container element is empty". #}
{% if items is not empty %}
  <ul {{ bem('taxonomy-list', ['categories'], '') }}>
    {% for item in items %}
      <li {{ bem('item', [], 'taxonomy-list') }}>{{ item.content }}</li>
      <li aria-hidden="true" {{ bem('divider', [], 'taxonomy-list') }}>{{ '|' }}</li>
    {% endfor %}
  </ul>
{% endif %}
`;export{e as default};
//# sourceMappingURL=yds-categories-list-ClD0hrNh.js.map
