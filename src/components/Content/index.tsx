import React from "react";
import { ReactNode } from "react";
import TituloProfile from "./TituloProfile";

interface ContentProps {
  titulo: string;
  children: ReactNode;
}

const Content: React.FC<ContentProps> = ({ titulo, children }) => {
  return (
    <div className="content-wrapper">
      <TituloProfile>{titulo}</TituloProfile>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-15">
              <div className="card">
                <div className="card-body">
                  <div className="tab-content">
                    <div className="active tab-pane" id="activity">
                      <div className="post">
                        <div className="row mb-3">{children}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Content;
