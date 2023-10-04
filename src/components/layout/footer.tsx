export default function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Construído por{" "}
          <a
            className="font-medium underline underline-offset-4"
            href="https://baraus.dev"
            rel="noreferrer"
            target="_blank"
          >
            baraus.dev
          </a>
          . Código fonte disponível no{" "}
          <a
            className="font-medium underline underline-offset-4"
            href="https://github.com/devbaraus/kingsystem-client"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
