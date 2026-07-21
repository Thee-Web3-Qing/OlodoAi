import Link from "next/link";
export function Brand({light=false}:{light?:boolean}){return <Link className={light?"brand brand-light":"brand"} href="/">Olodo<span>AI</span><i>β</i></Link>}
