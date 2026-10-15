const n=`<div class="icons-demo" id="icons">
  {% for item in icons %}
    <div class="icons-demo__item">
      {% include "@atoms/images/icons/_yds-icon.twig" with {
        icon__name: item
      } %}
      <pre>{{ item }}</pre>
    </div>
  {% endfor %}
</div>
`;export{n as default};
//# sourceMappingURL=yds-icons-BE7fS5lQ.js.map
