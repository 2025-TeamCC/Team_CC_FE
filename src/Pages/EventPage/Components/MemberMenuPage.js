import React from "react";
import { Container } from "../../../util/Container";
import PropTypes from "prop-types";
import MemberItem from "./MemberItem";

function MemberMenuPage({ memberList }) {
    return (
        <div>
            <Container>
                {
                    memberList?.map((member, index) => (
                        <MemberItem key={index} member={member} />
                    ))
                }
            </Container>
        </div>
    )
}

MemberMenuPage.propTypes = {
    memberList : PropTypes.array.isRequired
}
export default MemberMenuPage;