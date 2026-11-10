const t=`{% set utility_nav__base_class = 'utility-nav' %}

{% include "@molecules/menu/yds-menu.twig" with {
  menu__base_class: utility_nav__base_class,
  menu__name: 'Utility',
  items: utility_nav__items|default(items),
} %}
`;export{t as default};
//# sourceMappingURL=_utility-nav--menu-B_BFQzq8.js.map
