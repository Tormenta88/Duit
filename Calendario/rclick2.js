const attachContextMenu = (() => {
  const contextMenu = document.createElement('ul');
  let clickedElement = null;

  const hideOnResize = () => hideMenu(true);

  function hideMenu(e) {
      if (e === true || !contextMenu.contains(e.target)) {
          contextMenu.remove();
          document.removeEventListener('click', hideMenu);
          window.removeEventListener('resize', hideOnResize);
      }
  };

  const attachOption = (target, opt) => {
      const item = document.createElement('li');
      item.className = 'context-menu-item';
      item.innerHTML = `<span>${opt.label}</span>`;
      item.addEventListener('click', e => {
          e.stopPropagation();
          if (!opt.subMenu || opt.subMenu.length === 0) {
              opt.action(opt, clickedElement);
              hideMenu(true);
          }
      });

      target.appendChild(item);

      if (opt.subMenu && opt.subMenu.length) {
          const subMenu = document.createElement('ul');
          subMenu.className = 'context-sub-menu';
          item.appendChild(subMenu);
          opt.subMenu.forEach(subOpt => attachOption(subMenu, subOpt))
      }
  };

  const showMenu = (e, menuOptions) => {
      e.preventDefault();
      clickedElement = e.target; // Guardar el elemento en el que se hizo click
      contextMenu.className = 'context-menu';
      contextMenu.innerHTML = '';
      
      let targetMenuOptions = menuOptions;

      // Diferenciar si se esta haciendo click dentro de un día
      if (clickedElement.className == 'contenedor' & clickedElement.querySelector('p').innerHTML != '') {
          targetMenuOptions = [
            {
                label: "Eventos", action(o, element) {
                    console.log("General Eventos", o, element.id, element.className);
                },
                subMenu: [
                    { label: 'Nuevo Evento', action(o, element) { añadirEvento(element) } },
                    { label: "Borrar Evento", action(o, element) { borrarEvento(element) } }
                ]
            },
            {
                label: "Opciones", action(o, element) {
                    console.log("General Opciones", o, element.id, element.className);
                },
                subMenu: [
                    { label: 'Ajustes', action(o, element) { openSettings() } },
                    { label: 'Modo Oscuro', action(o, element) { modoOscuro() } }
                ]
            }
          ];
      }

      // Agregar opciones al menu
      targetMenuOptions.forEach(opt => attachOption(contextMenu, opt));

      document.body.appendChild(contextMenu);

      const { innerWidth, innerHeight } = window;
      const { offsetWidth, offsetHeight } = contextMenu;
      let x = 0;
      let y = 0;

      if (e.clientX >= (innerWidth / 2)) {
          contextMenu.classList.add('left');
      }

      if (e.clientY >= (innerHeight / 2)) {
          contextMenu.classList.add('top');
      }

      if (e.clientX >= (innerWidth - offsetWidth)) {
          x = '-100%';
      }

      if (e.clientY >= (innerHeight - offsetHeight)) {
          y = '-100%';
      }

      contextMenu.style.left = e.clientX + 'px';
      contextMenu.style.top = e.clientY + 'px';
      contextMenu.style.transform = `translate(${x}, ${y})`;
      document.addEventListener('click', hideMenu);
      window.addEventListener('resize', hideOnResize);
  };

  return (options) => {
      document.body.addEventListener('contextmenu', (e) => showMenu(e, options));
  };
})();

attachContextMenu([
  {
      label: "Opciones", action(o, element) {
          console.log("General Opciones", o, element.id, element.className);
      },
      subMenu: [
        { label: 'Ajustes', action(o, element) { openSettings() } },
        { label: 'Modo Oscuro', action(o, element) { modoOscuro() } }
        ]
  }
]);
