import LeftIcon from "./icons/LeftIcon";
import RightIcon from "./icons/RightIcon";
import { CSSProperties } from "react";

interface PaginationProps {
  /**
   * Página actual que está siendo visualizada.
   */
  currentPage: number;

  /**
   * Número total de páginas disponibles.
   */
  totalPages: number;

  /**
   * Callback que se ejecuta al cambiar de página. Recibe la nueva página como argumento.
   */
  onPageChange?: (page: number) => void;

  /**
   * Clase CSS adicional para aplicar al contenedor principal del componente.
   */
  className?: string;

  /**
   * Estilo en línea para aplicar al contenedor principal del componente.
   */
  style?: CSSProperties;

  /**
   * Color que se aplica a los íconos de navegación (izquierda y derecha).
   * Por defecto: "#18181b"
   */
  colorIcon?: string;

  /**
   * Clase CSS para los botones de navegación (anterior y siguiente).
   * Si no se proporciona, se usa el estilo por defecto del módulo CSS.
   */
  buttonClassName?: string;

  /**
   * Clase CSS para el elemento `<ul>` que contiene los botones de página.
   */
  listClassName?: string;

  /**
   * Clase CSS para cada ítem de paginación (elementos `<li>`).
   */
  itemClassName?: string;

  /**
   * Clase CSS para el ítem activo (la página actual).
   * Si no se proporciona, se usa el estilo por defecto del módulo CSS.
   */
  activeItemClassName?: string;

  /**
   * Clase CSS para los ítems que muestran puntos suspensivos ("...").
   */ 
  ellipsisClassName?: string;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  style,
  colorIcon = "#18181b",
  activeItemClassName,
  buttonClassName,
  listClassName,
  itemClassName,
  ellipsisClassName,
}: PaginationProps) {
  return (
    <div className={[className].filter(Boolean).join(" ")} style={style}>
      {currentPage > 1 && (
        <button
          aria-label="Previous page"
          className={buttonClassName}
          onClick={() => onPageChange?.(currentPage - 1)}
        >
          <LeftIcon color={colorIcon} />
        </button>
      )}

      <ul className={listClassName}>
        {currentPage > 2 && (
          <li
            className={itemClassName}
            onClick={() => onPageChange?.(1)}
            role="button"
          >
            {1}
          </li>
        )}

        {currentPage > 3 && <li className={ellipsisClassName}>...</li>}

        {[currentPage - 1, currentPage, currentPage + 1].map(
          (page) =>
            page > 0 &&
            page <= totalPages && (
              <li
                key={page}
                className={[
                  itemClassName,
                  currentPage === page ? activeItemClassName : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => onPageChange?.(page)}
                role="button"
              >
                {page}
              </li>
            )
        )}

        {currentPage < totalPages - 2 && (
          <li className={ellipsisClassName}>...</li>
        )}

        {currentPage < totalPages - 1 && (
          <li
            className={itemClassName}
            onClick={() => onPageChange?.(totalPages)}
            role="button"
          >
            {totalPages}
          </li>
        )}
      </ul>

      {currentPage < totalPages && (
        <button
          aria-label="Next page"
          className={buttonClassName}
          onClick={() => onPageChange?.(currentPage + 1)}
        >
          <RightIcon color={colorIcon} />
        </button>
      )}
    </div>
  );
}

export default Pagination;
